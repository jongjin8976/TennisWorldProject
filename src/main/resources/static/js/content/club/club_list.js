//클럽 상세정보
function checkClubDetail(club_code) {

	const club_modal = new bootstrap.Modal('#clubModal');
	const club_code_inp = document.querySelector('#clubCode');
	const club_name_inp = document.querySelector('#clubName');
	const club_leader_inp = document.querySelector('#clubLeader');
	const club_tier_inp = document.querySelector('#clubTier');
	const club_intro_tex = document.querySelector('#clubIntro');
	const club_tbody = document.querySelector('#clubTbody');
	club_intro_tex.replaceChildren();
	console.log(club_code);
	club_tbody.replaceChildren();
	let str = '';
	//ajax start
	$.ajax({
		url: '/club/getClubDetailAjax', //요청경로
		type: 'post',
		async: false,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		//필요한 데이터
		data: { 'clubCode': club_code },
		success: function(result) {

			console.log(result);

			club_code_inp.value = club_code;
			club_name_inp.value = result['clubDetail'][0].clubName;
			club_leader_inp.value = result['clubDetail'][0].memberVO.memberName;
			club_tier_inp.value = result['clubDetail'][0].tierVO.tierName;
			club_intro_tex.insertAdjacentHTML('afterbegin', result['clubDetail'][0].clubIntro);

			result['clubMemList'].forEach(function(li, idx) {
				str += '<tr>';
				str += `<td>${idx + 1}</td>`;
				str += `<td>${li.memberName}</td>`;
				str += `<td>${li.tierVO.tierName}</td>`;
				str += '</tr>';
			});

			club_tbody.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

	club_modal.show();

}

//클럽 가입
function joinclub(member_id) {
	const club_code = document.querySelector('#clubModal #clubCode');
	console.log(club_code.value);
	//ajax start
	$.ajax({
		url: '/club/joinByDuplicationAjax', //요청경로
		type: 'post',
		async: true,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'memberId': member_id, 'clubCode': club_code.value }, //필요한 데이터
		success: function(result) {
			if (result == 1) {
				swal.fire({
					title: "클럽 가입",
					text: "가입하시겠습니까?",
					icon: "question",
					showCancelButton: true,
					confirmButtonText: "확인",
					cancelButtonText: "취소"
				}).then((r) => {
					if (r.isConfirmed) {
						//ajax start
						$.ajax({
							url: '/club/joinClubAjax', //요청경로
							type: 'post',
							async: true,
							//contentType : 'application/json; charset=UTF-8',
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							data: { 'memberId': member_id, 'clubCode': club_code.value }, //필요한 데이터
							success: function(result) {
								if (result == 1) {
									swal.fire({
										title: "클럽 가입이 완료되었습니다.",
										icon: 'success',
										button: '확인',
									}).then((r) => {
										location.href = "/";
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
						return
					}
				});
			}
			else if (result == 0) {
				swal.fire({
					title: "중복 가입은 불가합니다.",
					icon: 'error',
					button: '확인',
				});

			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}

//클럽관리창
function clubManage(leader_code, member_id, club_code) {
	if (leader_code != member_id) {
		swal.fire({
			title: "권한이 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		manage_modal = new bootstrap.Modal('#manageModal');
		//ajax start
		$.ajax({
			url: '/club/clubMemberManageAjax', //요청경로
			type: 'post',
			async: false,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'clubCode': club_code }, //필요한 데이터
			success: function(result) {
				console.log(result);
				const manage_tbody = document.querySelector('#manageTbody');
				manage_tbody.replaceChildren();
				let str = '';
				result.forEach(function(r, idx) {
					str += '<tr>';
					str += `<input type="hidden" value="${club_code}" id="clubCodeByModal">`;
					str += `<td>${idx + 1}</td>`;
					str += `<td>${r.memberName}</td>`;
					str += `<td>${r.tierVO.tierName}</td>`;
					str += `<td>${r.memberBirth}</td>`;
					if (r.memberId != leader_code) {
						str += `<td><input type="button" value="강퇴" class="btn btn-primary" onclick="dropOutMember('${r.memberId}','${club_code}');"></td>`;
					}
					else {
						str += '<td><input type="button" value="클럽장" class="btn btn-primary"></td>';
					}
				});
				manage_tbody.insertAdjacentHTML('afterbegin', str);
				manage_modal.show();
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}

function dropOutMember(member_id, club_code) {
	swal.fire({
		title: "강퇴",
		text: "강퇴하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/club/dropOutMemberAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'memberId': member_id, 'clubCode': club_code }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "강퇴가 완료되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = "/club/clubList";
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
				title: "강퇴가 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}

	});

}

//클럽 삭제
function deleteClub() {
	const club_code = document.querySelector('#clubCodeByModal').value;
	swal.fire({
		title: "클럽 삭제",
		html: "클럽은 삭제하시겠습니까? <br> 삭제한 클럽은 복구가 불가능합니다 <br> 신중하게 선택해주세요.",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			deleteClubAjax(club_code);
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
//클럽 삭제 Ajax
function deleteClubAjax(club_code) {
	//ajax start
	$.ajax({
		url: '/club/deleteClubAjax', //요청경로
		type: 'post',
		async: false,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'clubCode': club_code }, //필요한 데이터
		success: function(result) {
			if (result == 1) {
				swal.fire({
					title: "삭제가 완료되었습니다.",
					icon: 'success',
					button: '확인',
				}).then((r) => {
					location.href = "/club/clubList";
				});
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}




