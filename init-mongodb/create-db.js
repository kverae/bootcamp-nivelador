// Create user
dbAdmin = db.getSiblingDB("admin");

// Create DB and collection
db = new Mongo().getDB("test");
db.createCollection("users", { capped: false });