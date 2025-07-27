import { supabase } from './supabaseClient';

const projectService = {
  // Get all projects for the current user
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          owner:user_profiles!projects_owner_id_fkey(id, full_name, email, avatar_url),
          project_members(
            user_profiles(id, full_name, email, avatar_url, role)
          ),
          tasks(id, title, status, priority, due_date)
        `)
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
      return { success: false, error: 'Failed to load projects' };
    }
  },

  // Get a single project by ID
  async getProject(projectId) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          owner:user_profiles!projects_owner_id_fkey(id, full_name, email, avatar_url),
          project_members(
            user_profiles(id, full_name, email, avatar_url, role)
          ),
          tasks(
            id, title, description, status, priority, due_date, completed_at,
            assigned_to:user_profiles!tasks_assigned_to_fkey(id, full_name, avatar_url),
            created_by:user_profiles!tasks_created_by_fkey(id, full_name, avatar_url)
          ),
          activities(
            id, type, title, description, created_at,
            user:user_profiles!activities_user_id_fkey(id, full_name, avatar_url)
          )
        `)
        .eq('id', projectId)
        .single();

      if (error) {
        return { success: false, error: error.message };
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
      return { success: false, error: 'Failed to load project' };
    }
  },

  // Create a new project
  async createProject(projectData) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select(`
          *,
          owner:user_profiles!projects_owner_id_fkey(id, full_name, email, avatar_url)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
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
      return { success: false, error: 'Failed to create project' };
    }
  },

  // Update a project
  async updateProject(projectId, updates) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
        .select(`
          *,
          owner:user_profiles!projects_owner_id_fkey(id, full_name, email, avatar_url)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
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
      return { success: false, error: 'Failed to update project' };
    }
  },

  // Delete a project
  async deleteProject(projectId) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

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
      return { success: false, error: 'Failed to delete project' };
    }
  },

  // Get project activities/timeline
  async getProjectActivities(projectId, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select(`
          *,
          user:user_profiles!activities_user_id_fkey(id, full_name, email, avatar_url)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(limit);

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
      return { success: false, error: 'Failed to load activities' };
    }
  },

  // Add project member
  async addProjectMember(projectId, userId, role = 'member') {
    try {
      const { data, error } = await supabase
        .from('project_members')
        .insert([{ project_id: projectId, user_id: userId, role }])
        .select(`
          *,
          user_profiles(id, full_name, email, avatar_url, role)
        `)
        .single();

      if (error) {
        return { success: false, error: error.message };
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
      return { success: false, error: 'Failed to add project member' };
    }
  },

  // Remove project member
  async removeProjectMember(projectId, userId) {
    try {
      const { error } = await supabase
        .from('project_members')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', userId);

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
      return { success: false, error: 'Failed to remove project member' };
    }
  },

  // Subscribe to project changes
  subscribeToProject(projectId, callback) {
    const subscription = supabase
      .channel(`project-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `project_id=eq.${projectId}`
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'activities',
          filter: `project_id=eq.${projectId}`
        },
        callback
      )
      .subscribe();

    return subscription;
  },

  // Unsubscribe from project changes
  unsubscribeFromProject(subscription) {
    if (subscription) {
      supabase.removeChannel(subscription);
    }
  }
};

export default projectService;