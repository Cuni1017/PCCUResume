package com.example.demo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
<<<<<<< HEAD
=======
import org.springframework.web.cors.CorsUtils;
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwtAuthFilter;
  private final AuthenticationProvider authenticationProvider;
  private final LogoutHandler logoutHandler;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .csrf()
            .disable()
            .authorizeHttpRequests()
//        .requestMatchers("/api/v1/auth/**")
//          .permitAll()

            .requestMatchers(

                    "/register/**",
                    "/login",
                    "/swagger-ui/**"
                    //"/students/**"
            )
            .permitAll()
<<<<<<< HEAD
=======
            .requestMatchers(CorsUtils::isPreFlightRequest)
            .permitAll()
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00
            .anyRequest()
            .authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
//            .formLogin()
//            .loginPage("/login")
//            .and()
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .logout()
            .logoutUrl("/logout")
            .addLogoutHandler(logoutHandler)
            .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext());
<<<<<<< HEAD
=======
//            .and()
//        .cors()
//            .configurationSource(corsConfigurationSource());
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00


    return http.build();
  }

  @Bean
  public WebMvcConfigurer corsConfigure() {

    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
//                .allowCredentials(true)
                .allowedHeaders("*");
      }
<<<<<<< HEAD
    };

=======

      ;
    };
>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00
//  @Bean
//  CorsConfigurationSource corsConfigurationSource() {
//    CorsConfiguration configuration = new CorsConfiguration();
//    configuration.setAllowedOrigins(Arrays.asList("*"));
//    configuration.setAllowedMethods(Arrays.asList("GET","POST"));
//    configuration.setAllowCredentials(true);
//    //the below three lines will add the relevant CORS response headers
//    configuration.addAllowedOrigin("*");
//    configuration.addAllowedHeader("*");
//    configuration.addAllowedMethod("*");
//    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//    source.registerCorsConfiguration("/**", configuration);
//    return source;
//  }
<<<<<<< HEAD
  }
}
=======

  }
}

>>>>>>> 9aab6050f903c28d5cf29ef83443932a8ed14b00
