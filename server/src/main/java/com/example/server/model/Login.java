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
        String password;
        @Column(name = "user_level")
        Integer level;

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

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public Integer getLevel() {
            return level;
        }

        public void setLevel(Integer level) {
            this.level = level;
        }
    }
