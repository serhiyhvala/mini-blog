export type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row']

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			post: {
				Row: {
					created_at: string
					description: string | null
					id: string
					image: string | null
					title: string | null
					userId: string | null
				}
				Insert: {
					created_at?: string
					description?: string | null
					id?: string
					image?: string | null
					title?: string | null
					userId?: string | null
				}
				Update: {
					created_at?: string
					description?: string | null
					id?: string
					image?: string | null
					title?: string | null
					userId?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'post_userId_fkey'
						columns: ['userId']
						referencedRelation: 'user'
						referencedColumns: ['id']
					}
				]
			}
			user: {
				Row: {
					created_at: string
					email: string | null
					id: string
					image: string | null
					isWriter: boolean | null
					name: string | null
				}
				Insert: {
					created_at?: string
					email?: string | null
					id?: string
					image?: string | null
					isWriter?: boolean | null
					name?: string | null
				}
				Update: {
					created_at?: string
					email?: string | null
					id?: string
					image?: string | null
					isWriter?: boolean | null
					name?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}
