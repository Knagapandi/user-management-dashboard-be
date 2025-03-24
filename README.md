## **📌 Features**
✅ User Registration & Authentication  
✅ JWT Token-Based Login  
✅ Role-Based Access Control  
✅ Secure Password Hashing with `bcrypt`  
✅ PostgreSQL Database Integration using `TypeORM`  
✅ API Documentation with Swagger 
✅ Global Error Handling & Validation
✅ Unit Testing with Jest 

---

## **📌 Technologies Used**
- **NestJS** (Backend Framework)
- **PostgreSQL** (Database)
- **TypeORM** (ORM for Database)
- **bcrypt** (Password Hashing)
- **JWT** (Authentication)
- **Postman** (API Testing)
 Below is a detailed explanation of each feature you implemented.

📌 1. User Authentication (Register, Login, Logout)
✔️ Implemented user registration (POST /auth/register) to create new users.
✔️ Implemented user login (POST /auth/login) to verify credentials and generate a JWT token.
✔️ Allowed users to log out by clearing the token on the frontend (logout is typically managed client-side).

How It Works?
1. A new user registers by sending username, password, and role.
2. The system stores the user in the PostgreSQL database with a hashed password.
3. The user logs in, and the system validates their credentials.
4. If login is successful, a JWT token is returned, which the user must send in every request to access protected routes.

📌 2. JWT Token-Based Authorization
✔️ Used JWT (JSON Web Token) for secure authentication.
✔️ Implemented NestJS JwtAuthGuard to verify and extract the JWT from requests.
✔️ Configured role-based access to different endpoints based on user roles.

How It Works?
1. When a user logs in, the backend generates a JWT token that includes user information (username, role).
2. The frontend stores the JWT token and sends it in every request under the Authorization header:

text
Copy
Edit
Authorization: Bearer <your_access_token>
3. The backend extracts and validates the token using JwtStrategy.
4. If the token is valid, the user is authenticated and allowed access.
5. If the token is invalid or missing, the request is rejected with a 401 Unauthorized error.

📌 3. Role-Based Access Control (RBAC: Admin & User)
✔️ Implemented role-based authorization using custom decorators (@Roles) and a guard (RolesGuard).
✔️ Defined two roles:

Admin → Can create, update, delete users.
User → Can only read users.
How It Works?
Role	Access
Admin	Can create, update, delete, and list users
User	Can only view users
1. Admin routes (POST, PATCH, DELETE) are protected with @Roles('admin').
2. User routes (GET /users) allow both admin and user roles using @Roles('admin', 'user').

Example:

typescript
Copy
Edit
@Roles('admin') 
@Patch(':id') 
update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) { 
    return this.usersService.update(id, updateUserDto);
}
❌ If a "User" tries to delete another user, they receive a 403 Forbidden error.

📌 4. Secure Password Hashing using bcrypt
✔️ Used bcrypt to hash passwords before storing them in the database.
✔️ Ensured passwords are never stored in plain text.
✔️ Used bcrypt.compare() to securely validate user passwords during login.

How It Works?
1. When a user registers, bcrypt.hash() encrypts the password before saving it.
2. The hashed password is stored in the database instead of the plain text version.
3. During login, bcrypt.compare() checks the provided password against the stored hash.

Example:

typescript
Copy
Edit
const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
✅ This ensures that even if the database is compromised, user passwords remain safe.

📌 5. API Documentation with Swagger
✔️ Added Swagger OpenAPI documentation for all API endpoints.
✔️ Used @ApiTags(), @ApiBody(), @ApiBearerAuth() for better API documentation.
✔️ Allowed developers to test APIs directly via Swagger UI.

How It Works?
1. Open Swagger UI at http://localhost:3000/api.
2. Explore available endpoints, request bodies, and response formats.
3. Try out requests (Login, Register, Get Users) directly from the UI.

Example:

typescript
Copy
Edit
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
📌 6. PostgreSQL Database Integration with TypeORM
✔️ Used PostgreSQL as the database for storing user data.
✔️ Configured TypeORM for database interactions.
✔️ Created the User entity (user.entity.ts) for defining the database table.

How It Works?
1. Users are stored in PostgreSQL tables.
2. TypeORM automatically handles query execution & schema updates.
3. Used TypeORM decorators to define table structures and relationships.

Example:

typescript
Copy
Edit
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
✅ This ensures data integrity and prevents duplicate usernames.

📌 7. Global Error Handling & Validation
✔️ Used NestJS ValidationPipe to validate incoming requests.
✔️ Implemented global error handling for:

401 Unauthorized → If the user is not authenticated.
403 Forbidden → If the user doesn’t have permission.
404 Not Found → If a requested resource doesn’t exist.
How It Works?
1. If a request has missing fields, a 400 Bad Request error is returned.
2. If a user tries to access a restricted resource, a 403 Forbidden error is returned.
3. If a resource (like a user) does not exist, a 404 Not Found error is returned.

Example:

typescript
Copy
Edit
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
✅ This ensures that invalid data is never processed.

GitHub Repository: https://github.com/Knagapandi/Usermanagament_nestjsbe