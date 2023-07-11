//게시글 수정
function setBoard(btn, content, title, board_no) {
	const title_span = document.querySelector('#titleSpan');
	const textarea = document.querySelector('#boardContent');
	title_span.replaceChildren();
	let str = '';
	str += `<input type="text" id="tit" class="form-control" value="${title}">`
	title_span.insertAdjacentHTML('afterbegin', str);
	textarea.removeAttribute('readonly');
	btn.setAttribute("onclick", `updateBoard('${board_no}');`);
	btn.value = '등록';
	const cancel_btn = btn.nextElementSibling;
	cancel_btn.value = '취소';
	cancel_btn.setAttribute("onclick", `cancelSetBoard(this
	,'${content.replace(/\n/g, '\\n')}','${title}','${board_no}');`);
}
//수정 취소 
function cancelSetBoard(btn, content, title, board_no) {
	const title_span = document.querySelector('#titleSpan');
	title_span.replaceChildren();
	title_span.insertAdjacentHTML('afterbegin', title);
	const textarea = document.querySelector('#boardContent');
	textarea.setAttribute("readonly", true);
	textarea.value = content;
	btn.value = '삭제';
	btn.setAttribute("onclick", `delBoard('${board_no}')`);
	set_btn = btn.previousElementSibling;
	set_btn.value = '수정';
	set_btn.setAttribute("onclick", `setBoard(this
	,'${content.replace(/\n/g, '\\n')}','${title}','${board_no}');`);
}

//게시판 글 수정
function updateBoard(board_no) {
	const board_title = document.querySelector('#tit');
	const board_content = document.querySelector('#boardContent');
	if (board_title.value == '') {
		swal.fire({
			title: "빈 값은 입력할 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (board_content.value == '') {
		swal.fire({
			title: "빈 값은 입력할 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		swal.fire({
			title: "게시글 수정",
			text: "수정하시겠습니까?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/board/updateBoardAjax', //요청경로
					type: 'post',
					async: false,
					contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'boardNo': board_no, 'boardTitle': board_title.value, 'boardContent': board_content.value }, //필요한 데이터
					success: function(result) {
						if (result == 1) {
							swal.fire({
								title: "수정이 완료 되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r) => {
								location.href = `/board/boardDetail?boardNo=${board_no}`;
							});
						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end					
			}
			else if (r.isDismissed) {
				swal.fire({
					title: "등록이 취소되었습니다.",
					icon: 'success',
					button: '확인',
				});
			}
		});
	}
}

//게시글 삭제
function delBoard(board_no) {
	swal.fire({
		title: "게시글 삭제",
		text: "삭제하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/board/delBoardAjax', //요청경로
				type: 'post',
				async: true,
				//contentType : 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'boardNo': board_no }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "삭제되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r)=>{
							location.href = '/board/boardForm';
						});
					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end		
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "삭제가 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});

}


//댓글 등록
function regReply(board_no, role) {
	const reply_content = document.querySelector('#replyContent');
	if (role == 'anonymousUser') {
		swal.fire({
			title: "로그인 후 등록 가능합니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}

	if (reply_content.value == '') {
		swal.fire({
			title: "댓글을 입력해 주세요.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		swal.fire({
			title: "댓글 등록",
			text: "등록하시겠습니까?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/board/regReplyAjax', //요청경로
					type: 'post',
					async: true,
					//contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'boardNo': board_no, 'replyContent': reply_content.value }, //필요한 데이터
					success: function(result) {
						if (result == 1) {
							swal.fire({
								title: "등록이 완료 되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r) => {
								location.href = `/board/boardDetail?boardNo=${board_no}`;
							});
						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end

			}
			else if (r.isDismissed) {
				swal.fire({
					title: "승인이 취소되었습니다.",
					icon: 'success',
					button: '확인',
				});

			}

		});

	}
}
//댓글 수정
function setReply(btn, reply, rep_idx, reply_no, board_no) {
	const reply_content = document.querySelectorAll('.repCont');
	let rep_data = reply_content[rep_idx];
	rep_data.replaceChildren();
	let str = '';
	str += `<input type="text" class="form-control" id="rep" value="${reply}">`;
	rep_data.insertAdjacentHTML('afterbegin', str);
	const cancel_btn = btn.nextElementSibling;
	btn.value = '등록';
	cancel_btn.value = '취소';
	btn.setAttribute("onclick", `updateReply('${reply_no}'
	,'${board_no}');`);
	cancel_btn.setAttribute("onclick", `cancelReply(this
	,'${reply}','${rep_idx}','${reply_no}','${board_no}');`);

}
//실제 수정
function updateReply(reply_no, board_no) {
	const rep_content = document.querySelector('#rep');
	if (rep_content.value == '') {
		swal.fire({
			title: "빈값은 입력 할 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		swal.fire({
			title: "수정",
			text: "수정하시겠습니까?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/board/updateReplyAjax', //요청경로
					type: 'post',
					async: false,
					contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'replyNo': reply_no, 'replyContent': rep_content.value, 'boardNo': board_no }, //필요한 데이터
					success: function(result) {
						if (result != '') {
							swal.fire({
								title: "수정이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r) => {
								location.href = `/board/boardDetail?boardNo=${result}`;
							});

						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end
			}
			else if (r.isDismissed) {
				swal.fire({
					title: "취소되었습니다.",
					icon: 'success',
					button: '확인',
				});

			}

		});
	}


}

//수정 취소
function cancelReply(btn, reply, idx, reply_no, board_no) {
	const rep_input = document.querySelector('#rep');
	rep_input.insertAdjacentHTML('afterend', reply);
	rep_input.remove();
	const set_btn = btn.previousElementSibling
	set_btn.value = '수정';
	set_btn.setAttribute("onclick", `setReply(this,'${reply}','${idx}','${reply_no}','${board_no}');`);
	btn.value = '삭제';
	btn.setAttribute("onclick", `delReply('${reply_no}','${board_no}');`);

}
//댓글 삭제
function delReply(reply_no, board_no) {
	swal.fire({
		title: "댓글 삭제",
		text: "삭제하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/board/delReplyAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'replyNo': reply_no, 'boardNo': board_no }, //필요한 데이터
				success: function(result) {
					if (result != '') {
						swal.fire({
							title: "삭제 완료되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = `/board/boardDetail?boardNo=${result}`;
						});

					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end			
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}

	});

}
