package com.tennis.world.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tennis.world.board.service.BoardService;
import com.tennis.world.board.vo.BoardVO;
import com.tennis.world.board.vo.ReplyVO;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {
	@Resource(name = "boardService")
	private BoardService boardService;
	
	
	//게시판 메인 페이지
	@GetMapping("/boardForm")
	public String boardForm(Model model) {
		model.addAttribute("boardList", boardService.getBoardList("N"));
		return "content/board/board_form";
	}
	
	//게시글 등록
	@PostMapping("/regBoardAjax")
	@ResponseBody
	public int regBoardAjax(BoardVO boardVO, Authentication authentication) {
		boardVO.setBoardWriter(authentication.getName());		
		return boardService.regBoard(boardVO);
	}
	
	//게시글 조회수 업데이트
	@PostMapping("/setReadCntAjax")
	@ResponseBody
	public int setReadCntAjax(String boardNo) {
		return boardService.setReadCnt(boardNo);
	}
	
	//게시글 상세정보
	@GetMapping("/boardDetail")
	public String boardDetail(Model model,String boardNo) {
		Map<String, Object> boardMap = new HashMap<>();
		boardMap.put("boardDetail", boardService.getBoardDetail(boardNo));
		boardMap.put("replyList", boardService.getReplyListByBoard(boardNo));
		model.addAttribute("boardMap",boardMap);
		return "content/board/board_detail";
	}
	
	//게시글 수정
	@PostMapping("/updateBoardAjax")
	@ResponseBody
	public int updateBoardAjax(BoardVO boardVO) {
		return boardService.updateBoard(boardVO);
	}
	
	//게시글 삭제
	@PostMapping("/delBoardAjax")
	@ResponseBody
	public int delBoardAjax(String boardNo) {		
		return boardService.delBoard(boardNo);
	}
	
	//댓글 등록
	@PostMapping("/regReplyAjax")
	@ResponseBody
	public int regReplyAjax(ReplyVO replyVO, Authentication authentication) {
		replyVO.setReplyWriter(authentication.getName());
		return boardService.regReply(replyVO);
	}
	
	//댓글 수정
	@PostMapping("/updateReplyAjax")
	@ResponseBody
	public String updateReplyAjax(ReplyVO replyVO) {
		boardService.updateReply(replyVO);
		return replyVO.getBoardNo();
	}
	
	//댓글 삭제
	@PostMapping("/delReplyAjax")
	@ResponseBody
	public String delReplyAjax(ReplyVO replyVO) {
		boardService.deleteReply(replyVO);
		return replyVO.getBoardNo();
	}
	
	//공지사항 페이지
	@GetMapping("/noticeBoardForm")
	public String noticeBoardForm(Model model) {	
		model.addAttribute("boardList", boardService.getBoardList("Y"));
		return "content/board/notice_form";
	}
	
	//공지사항 등록
	@PostMapping("/regNoticeAjax")
	@ResponseBody
	public int regNoticeAjax(BoardVO boardVO,Authentication authentication) {
		boardVO.setBoardWriter(authentication.getName());
		return boardService.regNoticeBoard(boardVO);
	}
	

}
