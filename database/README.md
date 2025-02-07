# DataBase files

- [DB deployment script](DB_deployment_script.sql) - use it on a clean new database to create all the tables and relationships to run this script, just run it as a SQL query.

- [insert-example-data.sql](insert-example-data.sql) - use it to insert example data in db and test how it works. Currently inserts only into Accounts and Account_types.

# How to deploy DB
To deploy the DB, you need a clean DB in postgres. After creating it, do the following:
1) run the `DB_Deplyument_script.sql` file.
2) run the `insert-example-data.sql` file if you need some data to work with the DB.

