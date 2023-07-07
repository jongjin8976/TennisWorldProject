package com.tennis.world.board.service;

import java.util.List;

import com.tennis.world.board.vo.BoardVO;
import com.tennis.world.board.vo.ReplyVO;

public interface BoardService {
	
	//게시글 목록
	List<BoardVO> getBoardList(String isNotice);

	//게시글 등록
	int regBoard(BoardVO boardVO);
	
	//게시글 조회수 업데이트
	int setReadCnt(String boardNo);
	
	//게시글 상세정보
	BoardVO getBoardDetail(String boardNo);
	
	//댓글 조회 
	List<ReplyVO> getReplyListByBoard(String boardNo);
	
	//댓글 등록
	int regReply(ReplyVO replyVO);
	
	//댓글 수정
	void updateReply(ReplyVO replyVO);
	
	//댓글 삭제
	void deleteReply(ReplyVO replyVO);
	
	//게시글 수정
	int updateBoard(BoardVO boardVO);
	
	//게시글 삭제
	int delBoard(String boardNo);
	
	//공지사항 등록
	int regNoticeBoard(BoardVO boardVO);
}
