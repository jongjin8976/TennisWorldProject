package com.tennis.world.member.service;


import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tennis.world.member.vo.MemberVO;

import jakarta.annotation.Resource;

@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

	@Resource(name = "memberService")
	private MemberService memberService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO member = memberService.login(username);
		System.out.println("member = " + member);
		if (member == null) {
			throw new UsernameNotFoundException("오류");
		}
		else if(member.getMemState().equals("N")) {
			throw new DisabledException("접근이 거부되었습니다 관리자에게 문의하세요");
		}

		UserDetails user = User.withUsername(member.getMemberId())
								.password(member.getMemberPw())
								.roles(member.getIsAdmin()).build();

		return user;
	}

}
