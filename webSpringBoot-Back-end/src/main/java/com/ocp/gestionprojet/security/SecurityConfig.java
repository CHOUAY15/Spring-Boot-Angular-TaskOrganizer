package com.ocp.gestionprojet.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ocp.gestionprojet.api.service.impl.UserDetailsServiceImpl;

import org.springframework.security.authentication.AuthenticationManager;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private JwtAuthEntryPoint authEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login").permitAll()

                        .requestMatchers("/api/departments/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/teams/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/teams/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/teams/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/teams/**").hasAnyRole("ADMIN", "CHEF", "USER")

                        .requestMatchers(HttpMethod.POST, "/api/members/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/members/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/members/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/members/**").hasAnyRole("ADMIN", "CHEF", "USER")

                        .requestMatchers(HttpMethod.POST, "/api/projects/**").hasAnyRole("ADMIN", "CHEF")
                        .requestMatchers(HttpMethod.PUT, "/api/projects/**").hasAnyRole("ADMIN", "CHEF")
                        .requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasAnyRole("ADMIN", "CHEF")
                        .requestMatchers(HttpMethod.GET, "/api/projects/**").hasAnyRole("ADMIN", "CHEF","USER")



                        .requestMatchers(HttpMethod.POST, "/api/tasks/**").hasAnyRole("ADMIN","CHEF")
                        .requestMatchers(HttpMethod.PUT, "/api/tasks/**").hasAnyRole("ADMIN","CHEF","USER")
                        .requestMatchers(HttpMethod.DELETE, "/api/tasks/**").hasAnyRole("ADMIN","CHEF")
                        .requestMatchers(HttpMethod.GET, "/api/tasks/**").hasAnyRole("ADMIN", "CHEF", "USER")                        .requestMatchers("/api/commentaires/**").hasAnyRole("ADMIN", "CHEF")

                        .anyRequest().authenticated())
                .httpBasic().disable();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter();
    }
}