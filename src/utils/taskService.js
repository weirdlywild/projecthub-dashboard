import { supabase } from './supabaseClient';

const taskService = {
  // Get tasks for a project
  async getProjectTasks(projectId) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
          created_by:user_profiles!tasks_created_by_fkey(id, full_name, email, avatar_url)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load tasks' };
    }
  },

  // Get all tasks assigned to current user
  async getMyTasks() {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          project:projects(id, name),
          assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
          created_by:user_profiles!tasks_created_by_fkey(id, full_name, email, avatar_url)
        `)
        .eq('assigned_to', session.session.user.id)
        .order('due_date', { ascending: true, nullsLast: true });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load tasks' };
    }
  },

  // Get overdue tasks
  async getOverdueTasks(projectId = null) {
    try {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          project:projects(id, name),
          assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
          created_by:user_profiles!tasks_created_by_fkey(id, full_name, email, avatar_url)
        `)
        .lt('due_date', new Date().toISOString())
        .neq('status', 'completed')
        .order('due_date', { ascending: true });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to load overdue tasks' };
    }
  },

  // Create a new task
  async createTask(taskData) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([taskData])
        .select(`
          *,
          assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
          created_by:user_profiles!tasks_created_by_fkey(id, full_name, email, avatar_url)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Create activity for task creation
      await this.createTaskActivity(taskData.project_id, taskData.created_by, 'task', 'Task Created', `Created task: ${taskData.title}`);

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to create task' };
    }
  },

  // Update a task
  async updateTask(taskId, updates) {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select(`
          *,
          assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, email, avatar_url),
          created_by:user_profiles!tasks_created_by_fkey(id, full_name, email, avatar_url)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
      }

      // Create activity for task update
      if (updates.status === 'completed') {
        await this.createTaskActivity(data.project_id, data.assigned_to?.id, 'task', 'Task Completed', `Completed task: ${data.title}`);
      } else if (updates.status) {
        await this.createTaskActivity(data.project_id, updates.assigned_to || data.assigned_to?.id, 'task', 'Task Updated', `Updated task status: ${data.title}`);
      }

      return { success: true, data };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to update task' };
    }
  },

  // Delete a task
  async deleteTask(taskId) {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to delete task' };
    }
  },

  // Helper function to create activity
  async createTaskActivity(projectId, userId, type, title, description) {
    try {
      if (!userId) return;
      
      await supabase
        .from('activities')
        .insert([{
          project_id: projectId,
          user_id: userId,
          type,
          title,
          description
        }]);
    } catch (error) {
      // Silent fail for activity logging
      console.log('Failed to create activity:', error);
    }
  }
};

export default taskService;