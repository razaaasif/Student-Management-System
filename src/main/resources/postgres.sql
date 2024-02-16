create DATABASE sms ;
user sms; 
    create table roles (
       id int8 not null,
        name varchar(255) not null,
        primary key (id)
    )
;    
    create table student (
       roll_number varchar(255) not null,
        branch varchar(255),
        email varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        primary key (roll_number)
    )
;    
    create table user_roles (
       user_id int8 not null,
        role_id int8 not null
    )
;    
    create table users (
       id  bigserial not null,
        enabled int4 not null,
        password varchar(255),
        username varchar(255),
        primary key (id)
    )
;    
    alter table user_roles 
       add constraint FKh8ciramu9cc9q3qcqiv4ue8a6 
       foreign key (role_id) 
       references roles
;    
    alter table user_roles 
       add constraint FKhfh9dx7w3ubf1co1vdev94g3f 
       foreign key (user_id) 
       references users