// Create a type for the roles
export type Roles = "ADMIN" | "STUDENT";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
