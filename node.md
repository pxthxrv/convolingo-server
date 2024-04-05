mysql> SHOW Tables;
+----------------------+
| Tables_in_convolingo |
+----------------------+
| Interactions         |
| knex_migrations      |
| knex_migrations_lock |
| Languages            |
| Libraries            |
| UserLibrary          |
| users                |
| Vocab                |
| VocabScore           |
+----------------------+

SELECT * FROM your_table_name LIMIT 5;

DESCRIBE your_table_name;

SHOW COLUMNS FROM your_table_name;


**** Vocab TABLE ***
language and definition language should be number not string.
Currently not capturing data correctly. All definition langughe should b english at this point...
Columns could be more clear "vocab_language" and "definition_language"

mysql> describe Vocab;
+---------------------+--------------+------+-----+---------+----------------+
| Field               | Type         | Null | Key | Default | Extra          |
+---------------------+--------------+------+-----+---------+----------------+
| id                  | int          | NO   | PRI | NULL    | auto_increment |
| vocab               | varchar(255) | NO   |     | NULL    |                |
| language            | varchar(255) | YES  |     | NULL    |                |
| definition          | text         | YES  |     | NULL    |                |
| definition_language | varchar(255) | YES  |     | NULL    |                |
| word_class          | varchar(255) | YES  |     | NULL    |                |
| pronunciation       | varchar(255) | YES  |     | NULL    |                |
| used_in_a_sentence  | text         | YES  |     | NULL    |                |
| date_added          | timestamp    | YES  |     | NULL    |                |
| num_of_saves        | int          | YES  |     | NULL    |                |
+---------------------+--------------+------+-----+---------+----------------+
10 rows in set (0.00 sec)




mysql> describe users;
+-----------------+--------------+------+-----+---------+----------------+
| Field           | Type         | Null | Key | Default | Extra          |
+-----------------+--------------+------+-----+---------+----------------+
| id              | int          | NO   | PRI | NULL    | auto_increment |
| username        | varchar(255) | NO   |     | NULL    |                |
| password_hash   | varchar(255) | NO   |     | NULL    |                |
| email           | varchar(255) | YES  |     | NULL    |                |
| signup_date     | datetime     | YES  |     | NULL    |                |
| first_name      | varchar(100) | YES  |     | NULL    |                |
| last_name       | varchar(100) | YES  |     | NULL    |                |
| date_of_birth   | date         | YES  |     | NULL    |                |
| native_language | varchar(50)  | YES  |     | NULL    |                |
| target_language | varchar(50)  | YES  |     | NULL    |                |
| time_per_day    | int          | YES  |     | NULL    |                |
| level           | int          | YES  |     | NULL    |                |
| difficulty      | varchar(50)  | YES  |     | NULL    |                |
| cefr            | varchar(50)  | YES  |     | NULL    |                |
+-----------------+--------------+------+-----+---------+----------------+
14 rows in set (0.00 sec)

-- Backup specific table
CREATE TABLE backup_table_name LIKE original_table_name;
INSERT INTO backup_table_name SELECT * FROM original_table_name;


mysql> describe Interactions;
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| id          | int          | NO   | PRI | NULL    | auto_increment |
| interaction | text         | YES  |     | NULL    |                |
| author      | varchar(255) | YES  |     | NULL    |                |
| user_id     | int          | YES  | MUL | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
4 rows in set (0.00 sec)

mysql> Select * From Languages limit 5;
+----+------------+-----------+----------+--------------+-------------+
| id | lang       | lang_simp | iso_code | display_name | native_name |
+----+------------+-----------+----------+--------------+-------------+
|  1 | german-de  | german    | de       | German       | Deutsch     |
|  2 | english-us | english   | en-us    | English (US) | English     |
|  3 | english-uk | english   | en-gb    | English (UK) | English     |
|  4 | spanish-es | spanish   | es       | Spanish      | Español     |
|  5 | french-fr  | french    | fr       | French       | Français    |
+----+------------+-----------+----------+--------------+-------------+
5 rows in set (0.00 sec)

mysql> describe Languages
    -> ;
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| id           | int          | NO   | PRI | NULL    | auto_increment |
| lang         | varchar(50)  | NO   |     | NULL    |                |
| lang_simp    | varchar(50)  | NO   |     | NULL    |                |
| iso_code     | varchar(10)  | NO   |     | NULL    |                |
| display_name | varchar(100) | NO   |     | NULL    |                |
| native_name  | varchar(100) | NO   |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+


