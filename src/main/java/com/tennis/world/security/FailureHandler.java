package com.tennis.world.security;

import java.io.IOException;
import java.io.PrintWriter;


import org.springframework.security.core.AuthenticationException;

import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


//로그인 실패 시 자동으로 실행되는 클래스
public class FailureHandler extends SimpleUrlAuthenticationFailureHandler{

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		String errorMsg = exception.getMessage();
		System.out.println(errorMsg);
		response.setCharacterEncoding("UTF-8");
		PrintWriter p = response.getWriter();
		p.write(errorMsg);
		p.flush();
	}	
}
