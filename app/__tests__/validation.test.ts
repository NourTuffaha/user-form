import { describe, it, expect } from 'vitest';
import { 
  validateName, 
  validateEmail, 
  validateBio, 
  UserProfileSchema
} from '@/lib/validation';

describe('Form Validation Functions', () => {
  // Name validation tests
  describe('validateName', () => {
    it('should return null for valid names', () => {
      expect(validateName('John')).toBeNull();
      expect(validateName('Jane Doe')).toBeNull();
      expect(validateName('A-B C')).toBeNull();
    });

    it('should return error message for names shorter than 2 characters', () => {
      expect(validateName('')).toBe('Name must be at least 2 characters long');
      expect(validateName('A')).toBe('Name must be at least 2 characters long');
    });

it('should return error for non-string inputs', () => {
  expect(validateName(null)).toBe('Invalid name');
  expect(validateName(undefined)).toBe('Invalid name');
  expect(validateName(123)).toBe('Invalid name');
  expect(validateName({})).toBe('Invalid name');
});
  });

  // Email validation tests
  describe('validateEmail', () => {
    it('should return null for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name+tag@domain.co.uk')).toBeNull();
      expect(validateEmail('user-name@domain.com')).toBeNull();
    });

    it('should return error message for invalid email addresses', () => {
      expect(validateEmail('')).toBe('Please enter a valid email address');
      expect(validateEmail('notanemail')).toBe('Please enter a valid email address');
      expect(validateEmail('missing@domain')).toBe('Please enter a valid email address');
      expect(validateEmail('wrong@.com')).toBe('Please enter a valid email address');
      expect(validateEmail('@nodomain.com')).toBe('Please enter a valid email address');
    });

it('should return error for non-string inputs', () => {
  expect(validateEmail(null)).toBe('Invalid email');
  expect(validateEmail(undefined)).toBe('Invalid email');
  expect(validateEmail(123)).toBe('Invalid email');
  expect(validateEmail({})).toBe('Invalid email');
});
  });

  // Bio validation tests
  describe('validateBio', () => {
    it('should return null for valid bio text', () => {
      expect(validateBio('')).toBeNull();
      expect(validateBio('This is a short bio')).toBeNull();
      expect(validateBio('A'.repeat(200))).toBeNull(); // Exactly 200 chars
    });

    it('should return error message for bio exceeding 200 characters', () => {
      expect(validateBio('A'.repeat(201))).toBe('Bio cannot exceed 200 characters');
      expect(validateBio('A'.repeat(500))).toBe('Bio cannot exceed 200 characters');
    });

it('should return error for non-string inputs', () => {
  expect(validateBio(null)).toBe('Invalid bio');
  expect(validateBio(undefined)).toBe(null);
  expect(validateBio(123)).toBe('Invalid bio');
  expect(validateBio({})).toBe('Invalid bio');
});
  });

  // Zod schema validation tests
  describe('UserProfileSchema', () => {
    it('should validate a correct user profile object', () => {
      const validProfile = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Frontend developer'
      };
      
      const result = UserProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should validate a user profile without optional bio', () => {
      const validProfile = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com'
      };
      
      const result = UserProfileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it('should fail validation with invalid name', () => {
      const invalidProfile = {
        id: 'user-123',
        name: 'J', // Too short
        email: 'john@example.com',
        bio: 'Frontend developer'
      };
      
      const result = UserProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name');
      }
    });

    it('should fail validation with invalid email', () => {
      const invalidProfile = {
        id: 'user-123',
        name: 'John Doe',
        email: 'not-an-email',
        bio: 'Frontend developer'
      };
      
      const result = UserProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });

    it('should fail validation with bio exceeding max length', () => {
      const invalidProfile = {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'A'.repeat(201) // Too long
      };
      
      const result = UserProfileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('bio');
      }
    });

    it('should fail validation with missing required fields', () => {
      const missingFields = {
        id: 'user-123'
        // Missing name and email
      };
      
      const result = UserProfileSchema.safeParse(missingFields);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorPaths = result.error.issues.map(issue => issue.path[0]);
        expect(errorPaths).toContain('name');
        expect(errorPaths).toContain('email');
      }
    });
  });
});