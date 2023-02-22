package com.example.server.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
    @Entity
    @Table(name = "login")
    public class Login {
        @Id
        @Column(name = "user_id")
        String user_id;
        @Column(name = "user_username")
        String user_username;
        @Column(name = "user_password")
        String user_password;
        @Column(name = "user_level")
        Integer user_level;

        public String getUser_id() {
            return user_id;
        }

        public void setUser_id(String user_id) {
            this.user_id = user_id;
        }

        public String getUser_username() {
            return user_username;
        }

        public void setUser_username(String user_username) {
            this.user_username = user_username;
        }

        public String getUser_password() {
            return user_password;
        }

        public void setUser_password(String user_password) {
            this.user_password = user_password;
        }

        public Integer getUser_level() {
            return user_level;
        }

        public void setUser_level(Integer user_level) {
            this.user_level = user_level;
        }
    }
