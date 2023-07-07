//승급 심사
function requestAdvan() {
	//ajax start
	$.ajax({
		url: '/member/checkRequestAdAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		success: function(result) {
			if (result == 0) {
				swal.fire({
					title: "승급 신청",
					text: "신청하시겠습니까?",
					icon: "question",
					showCancelButton: true,
					confirmButtonText: "확인",
					cancelButtonText: "취소"
				}).then((r) => {
					if (r.isConfirmed) {
						//ajax start
						$.ajax({
							url: '/member/requestAdvanceValiAjax', //요청경로
							type: 'post',
							async: true,
							contentType: 'application/json; charset=UTF-8',
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							success: function(result) {
								if (result == true) {
									//ajax start
									$.ajax({
										url: '/member/requestAdvanceAjax', //요청경로
										type: 'post',
										async: true,
										contentType: 'application/json; charset=UTF-8',
										contentType: "application/x-www-form-urlencoded; charset=UTF-8",
										success: function(result) {
											if (result == 1) {
												swal.fire({
													title: "승급 신청이 완료되었습니다.",
													icon: 'success',
													button: '확인',
												}).then((r) => {
													location.href = "/member/myInfoForm";
												});
											}
											else {
												swal.fire({
													title: "오류발생.",
													text: "관리자에게 문의하세요",
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
								else {
									swal.fire({
										title: "승급에 필요한 포인트가 모자랍니다.",
										icon: 'error',
										button: '확인',
									});
									return
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
							title: "신청이 취소되었습니다.",
							icon: 'success',
							button: '확인',
						});
					}

				});
			}
			else {
				swal.fire({
					title: "이미 신청 하셨습니다.",
					icon: 'error',
					button: '확인',
				});
				return
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}
//클럽탈퇴
function clubSecession(club_code, member_id) {
	swal.fire({
		title: "클럽 탈퇴",
		text: "탈퇴하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/club/clubSecessionAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'clubCode': club_code, 'memberId': member_id }, //필요한 데이터
				success: function(result) {
					if (result == 1) {
						swal.fire({
							title: "탈퇴가 완료 되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							location.href = '/member/myInfoForm';
						});
					}
					else {
						swal.fire({
							title: "오류가 발생했습니다.",
							icon: 'error',
							button: '확인',
						});
						return
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
	})

}


//이미지 등록 파일 태그 열기
function uploadMemImgFile() {
	const mem_img_file_tag = document.querySelector('#memImg');
	mem_img_file_tag.click();
}

//이미지 등록 submit
function regMemImg() {
	const mem_img_file_tag = document.querySelector('#memImg');
	console.log(mem_img_file_tag.value);
	const img_form = document.querySelector('#imgForm');
	if (mem_img_file_tag.value == '') {
		swal.fire({
			title: "이미지를 등록해주세요.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		swal.fire({
			title: "이미지 등록",
			text: "등록하시겠습니까?",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소"
		}).then((r) => {
			if (r.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/member/regMemImg', //요청경로
					type: 'post',
					async: false,
					processData: false,
					enctype: 'multipart/form-data',
					contentType: false,
					data: new FormData($("#imgForm")[0]), //필요한 데이터
					cache: false,
					success: function(result) {
						if (result == true) {
							swal.fire({
								title: "변경이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r) => {
								const spin_modal = new bootstrap.Modal('#spinModal');
								spin_modal.show();
								setInterval(function(){
									location.href = '/member/myInfoForm';
								}, 3000);
								
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









