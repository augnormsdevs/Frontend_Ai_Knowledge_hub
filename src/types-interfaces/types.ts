export type User = {
  id: number;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string; // ISO 8601 format datetime string
  groups: number[]; // Assuming groups are represented by IDs
  user_permissions: number[]; // Assuming permissions are represented by IDs
  profile_picture: string | null;
  bio: string;
};

export type Document = {
  id: number;
  owner: number; // User ID reference
  title: string;
  file: string; // File path or URL
  uploaded_at: string; // ISO 8601 format datetime string
  file_size: number
};

export interface Message {
  sender: 'user' | 'ai'
  text: string
  timestamp: string
}