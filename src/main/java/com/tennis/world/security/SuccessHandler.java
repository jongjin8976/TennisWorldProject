package com.tennis.world.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		
		PrintWriter p = response.getWriter();
		p.write("success");
		p.flush();
		
		
		
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
	

}
