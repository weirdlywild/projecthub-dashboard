import { supabase } from './supabaseClient';

const integrationService = {
  // Get all integrations for current user
  async getUserIntegrations() {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('service_name', { ascending: true });

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
      return { success: false, error: 'Failed to load integrations' };
    }
  },

  // Add or update an integration
  async upsertIntegration(serviceName, status, config = {}) {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const integrationData = {
        user_id: session.session.user.id,
        service_name: serviceName,
        status,
        config,
        last_sync_at: status === 'connected' ? new Date().toISOString() : null
      };

      const { data, error } = await supabase
        .from('integrations')
        .upsert(integrationData, { 
          onConflict: 'user_id,service_name',
          ignoreDuplicates: false 
        })
        .select()
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
      return { success: false, error: 'Failed to update integration' };
    }
  },

  // Connect an integration
  async connectIntegration(serviceName, config = {}) {
    return this.upsertIntegration(serviceName, 'connected', config);
  },

  // Disconnect an integration
  async disconnectIntegration(serviceName) {
    return this.upsertIntegration(serviceName, 'disconnected', {});
  },

  // Update integration sync status
  async updateSyncStatus(serviceName, status) {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('integrations')
        .update({ 
          status,
          last_sync_at: status === 'connected' ? new Date().toISOString() : null 
        })
        .eq('user_id', session.session.user.id)
        .eq('service_name', serviceName)
        .select()
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
      return { success: false, error: 'Failed to update sync status' };
    }
  },

  // Get integration status
  async getIntegrationStatus(serviceName) {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('integrations')
        .select('*')
        .eq('user_id', session.session.user.id)
        .eq('service_name', serviceName)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        return { success: false, error: error.message };
      }

      return { success: true, data: data || null };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to get integration status' };
    }
  },

  // Get integration statistics
  async getIntegrationStats() {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        return { success: false, error: 'User not authenticated' };
      }

      const { data, error } = await supabase
        .from('integrations')
        .select('status')
        .eq('user_id', session.session.user.id);

      if (error) {
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        connected: data?.filter(i => i.status === 'connected').length || 0,
        disconnected: data?.filter(i => i.status === 'disconnected').length || 0,
        error: data?.filter(i => i.status === 'error').length || 0,
        syncing: data?.filter(i => i.status === 'syncing').length || 0
      };

      return { success: true, data: stats };
    } catch (error) {
      if (error?.message?.includes('Failed to fetch') || 
          error?.message?.includes('NetworkError') ||
          error?.name === 'TypeError' && error?.message?.includes('fetch')) {
        return { 
          success: false, 
          error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
        };
      }
      return { success: false, error: 'Failed to get integration statistics' };
    }
  },

  // Test integration connection
  async testIntegrationConnection(serviceName) {
    // Simulate connection test
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        resolve({
          success,
          data: {
            serviceName,
            status: success ? 'connected' : 'error',
            message: success ? 'Connection successful' : 'Connection failed'
          }
        });
      }, 1500);
    });
  }
};

export default integrationService;