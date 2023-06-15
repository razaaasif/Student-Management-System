use database railway;
 CREATE TABLE `users` (
       `id` BIGINT NOT NULL AUTO_INCREMENT,
       `enabled` INT NOT NULL,
       `password` VARCHAR(255) DEFAULT NULL,
       `username` VARCHAR(255) DEFAULT NULL,
       PRIMARY KEY (`id`)
     ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

 INSERT INTO `users`
     (`id`,
     `enabled`,
     `password`,
     `username`)
     VALUES
     ('1', '1', '$2a$10$jdS9rkBqPAeNbfDZgn02QOVOf.SO9yaVM80Lb5Q8E9FvB29.CJShm', 'admin')
     ;
 
 CREATE TABLE `roles` (
       `id` BIGINT NOT NULL,
       `name` VARCHAR(255) DEFAULT NULL,
       PRIMARY KEY (`id`)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
 CREATE TABLE `user_roles` (
       `user_id` BIGINT NOT NULL,
       `role_id` BIGINT NOT NULL,
       KEY `FKh8ciramu9cc9q3qcqiv4ue8a6` (`role_id`),
       KEY `FKhfh9dx7w3ubf1co1vdev94g3f` (`user_id`),
       CONSTRAINT `FKh8ciramu9cc9q3qcqiv4ue8a6` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
       CONSTRAINT `FKhfh9dx7w3ubf1co1vdev94g3f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 
INSERT INTO `roles` VALUES('1', 'STUDENT');
 
 INSERT INTO `roles` VALUES('2', 'TEACHER');
 
 INSERT INTO `roles` VALUES('3', 'ADMIN');
 
  INSERT INTO `user_roles`
     (`user_id`,
     `role_id`) VALUES(1,1) , (1,2) ,(1,3);
 

CREATE TABLE `student` (
  `roll_number` VARCHAR(255) NOT NULL,
  `branch` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `first_name` VARCHAR(255) DEFAULT NULL,
  `last_name` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`roll_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
