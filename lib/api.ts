import { UserProfile } from "./interfaces/user"

// Delay to show skeleton
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock user data
const mockUser: UserProfile = {
  id: "user-123",
  name: "John Doe",
  email: "john@example.com",
  bio: "Frontend developer",
  profileImage: "/images/pg.jpg",
}

 // Fetch user profile data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getUserProfile(userId: string): Promise<UserProfile> {
  // Delay to simulate skeleton
  await delay(1500)

  return mockUser
}

// Update user profile
export async function updateUserProfile(userData: UserProfile): Promise<UserProfile> {


  return userData
}

// Upload profile image (mock implementation)
 
export async function uploadProfileImage(userId: string, file: File): Promise<string> {
  // Simulate upload delay for skeleton
  await delay(2000)

 
  return URL.createObjectURL(file)
}

