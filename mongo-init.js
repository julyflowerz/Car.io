// MongoDB initialization script
db = db.getSiblingDB('car-builder');

// Create application user with limited permissions
db.createUser({
  user: 'carbuilder',
  pwd: 'carbuilder123',
  roles: [
    {
      role: 'readWrite',
      db: 'car-builder'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

print('Database initialized successfully');
