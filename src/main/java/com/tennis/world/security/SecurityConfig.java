package com.tennis.world.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;




@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		security.csrf().disable()
				.authorizeHttpRequests()
				.requestMatchers("/"
								,"/member/joinMember"
								,"/member/idChkAjax"
								,"/member/login"
								,"/league/**"
								,"/board/**"
								).permitAll()
					.anyRequest().authenticated()
				.and()
					.formLogin()
					.loginPage("/member/loginForm")
					.loginProcessingUrl("/member/login")
					.usernameParameter("memberId")
					.passwordParameter("memberPw")
					.successHandler(getSuccessHandler())
					.failureHandler(getfailureHandler()) //실패했을때 어떻게 하겠다 클래스 사용
					.permitAll()
				.and()
					.logout()
					.logoutUrl("/logout")
					.invalidateHttpSession(true)
					.logoutSuccessUrl("/")
				.and()
					.exceptionHandling()
					.accessDeniedPage("/accessDeny");

		return security.build();
	}
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**", "/img/**");
    }
	@Bean
	public PasswordEncoder getPasswordEncoder() {

		return new BCryptPasswordEncoder();
	}
	
	@Bean
	//로그인 실패 시 실행되는 클래스 객체 생성
	public FailureHandler getfailureHandler() {
		
		return new FailureHandler();
	}
	//로그인 성공 시 실행되는 클래스 객체 생성
	@Bean
	public SuccessHandler getSuccessHandler() {
		
		return new SuccessHandler();
	}
	
	
}
