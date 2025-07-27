import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import authService from "../utils/authService";
import { isSupabaseConfigured } from "../utils/supabaseClient";
import type { AuthContextType, User, UserProfile, AuthEvent, AuthSession } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Initialize auth state
        const initializeAuth = async () => {
            try {
                setLoading(true);

                // If Supabase is not configured, use mock user for development
                if (!isSupabaseConfigured) {
                    console.log("Supabase not configured, using mock user for development");
                    if (isMounted) {
                        const mockUser: User = {
                            id: 'mock-user-id',
                            email: 'demo@example.com',
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        };
                        
                        const mockProfile: UserProfile = {
                            id: 'mock-user-id',
                            full_name: 'Demo User',
                            email: 'demo@example.com',
                            role: 'admin',
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        };

                        setUser(mockUser);
                        setUserProfile(mockProfile);
                    }
                    return;
                }

                // Add timeout to prevent infinite loading
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Auth initialization timeout')), 5000);
                });

                const sessionPromise = authService.getSession();
                const sessionResult = await Promise.race([sessionPromise, timeoutPromise]) as any;

                if (
                    sessionResult?.success &&
                    sessionResult?.data?.session?.user &&
                    isMounted
                ) {
                    const authUser = sessionResult.data.session.user;
                    setUser(authUser);

                    // Fetch user profile with timeout
                    try {
                        const profilePromise = authService.getUserProfile(authUser.id);
                        const profileResult = await Promise.race([profilePromise, timeoutPromise]) as any;

                        if (profileResult?.success && profileResult.data && isMounted) {
                            setUserProfile(profileResult.data);
                        }
                    } catch (profileError) {
                        console.log("Profile fetch error:", profileError);
                        // Continue without profile
                    }
                } else {
                    // No session found, ensure user is null
                    if (isMounted) {
                        setUser(null);
                        setUserProfile(null);
                    }
                }
            } catch (error) {
                console.log("Auth initialization error:", error);
                // On error, ensure user is null
                if (isMounted) {
                    setUser(null);
                    setUserProfile(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = authService.onAuthStateChange(async (event: AuthEvent, session: AuthSession | null) => {
            if (!isMounted) return;

            if (event === "SIGNED_IN" && session?.user) {
                setUser(session.user);

                // Fetch user profile for signed in user
                const profileResult = await authService.getUserProfile(session.user.id);
                if (profileResult?.success && profileResult.data && isMounted) {
                    setUserProfile(profileResult.data);
                }
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                setUserProfile(null);
            } else if (event === "TOKEN_REFRESHED" && session?.user) {
                setUser(session.user);
            }
        });

        return () => {
            isMounted = false;
            subscription?.unsubscribe?.();
        };
    }, []);

    // Sign in function
    const signIn = async (email: string, password: string) => {
        try {
            const result = await authService.signIn(email, password);

            if (!result?.success) {
                return { success: false, error: result?.error };
            }

            return { success: true, data: result.data };
        } catch (error) {
            const errorMsg = "Something went wrong during login. Please try again.";
            console.log("Sign in error:", error);
            return { success: false, error: errorMsg };
        }
    };

    // Sign out function
    const signOut = async () => {
        try {
            const result = await authService.signOut();

            if (!result?.success) {
                return { success: false, error: result?.error };
            }

            return { success: true };
        } catch (error) {
            const errorMsg = "Something went wrong during logout. Please try again.";
            console.log("Sign out error:", error);
            return { success: false, error: errorMsg };
        }
    };

    // Update profile function
    const updateProfile = async (updates: Partial<UserProfile>) => {
        try {
            if (!user?.id) {
                const errorMsg = "User not authenticated";
                return { success: false, error: errorMsg };
            }

            const result = await authService.updateUserProfile(user.id, updates);

            if (!result?.success) {
                return { success: false, error: result?.error };
            }

            if (result.data) {
                setUserProfile(result.data);
            }
            return { success: true, data: result.data };
        } catch (error) {
            const errorMsg = "Something went wrong updating profile. Please try again.";
            console.log("Update profile error:", error);
            return { success: false, error: errorMsg };
        }
    };

    // Reset password function
    const resetPassword = async (email: string) => {
        try {
            const result = await authService.resetPassword(email);

            if (!result?.success) {
                return { success: false, error: result?.error };
            }

            return { success: true };
        } catch (error) {
            const errorMsg = "Something went wrong sending reset email. Please try again.";
            console.log("Reset password error:", error);
            return { success: false, error: errorMsg };
        }
    };

    const value: AuthContextType = {
        user,
        userProfile,
        loading,
        signIn,
        signOut,
        updateProfile,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;