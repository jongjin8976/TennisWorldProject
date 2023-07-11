init();

function init(){
	
}

function idChk() {
	const mem_id = document.querySelector('#inputId');
	const join_btn = document.querySelector('#regBtn');
	const id_rule = /^[A-za-z0-9]{6,20}$/;
	if ($(mem_id).val() == '') {
		swal.fire({
			title: "오류",
			html: "빈 값은 입력될 수 <br>없습니다.",
			icon: "warning",
			button: '확인',
		})
		return
	}

	if (!id_rule.test($(mem_id).val().trim())) {
		swal.fire({
			title: "오류",
			html: "입력하신 아이디는<br> 규정에 어긋납니다.",
			icon: "warning",
			button: '확인',
		})
		return
	}

	else {
		//ajax start
		$.ajax({
			url: '/member/idChkAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'memberId': mem_id.value }, //필요한 데이터
			success: function(result) {
				if (result == 0) {
					swal.fire({
						title: "성공",
						html: "입력하신 아이디는<br> 사용가능합니다.",
						icon: "success",
						button: '확인',
					}).then((r) =>{
						if(r){
							join_btn.disabled = false;
						}
					});
				}
				else {
					swal.fire({
						title: "오류",
						html: "입력하신 아이디는 중복입니다<br> 다른 아이디를 입력해주세요.",
						icon: "warning",
						button: '확인',
					})
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end

	}

}
//오토 하이픈
const autoHyphen2 = (target) => {
 target.value = target.value
   .replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

//벨리데이션
function regMember() {
	//오류 메세지 삭제
	document.querySelectorAll('.my-invalid').forEach(function(msg){
		msg.remove();
	});
	
	//태그 벨류속성
	const mem_pw = document.querySelector('#inputPw').value;
	const mem_pw_ck = document.querySelector('#inputPwCk').value;
	const mem_name = document.querySelector('#inputName').value;
	const mem_birth = document.querySelector('#inputBirth').value;
	const mem_tell = document.querySelector('#inputTell').value;
	const terms_chk = document.querySelector('#check1');
	//정규식
	const password_rule = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
	
	
	//오류 메세지
	let str_pw_ck = '';
	let str_ch_chk = '';
	let str_name_ck = '';
	let str_birth_ck = '';
	let str_tell_ck = '';
	let str_terms_vali = '';
	
	
	//오류 메세지 들어갈 태그
	const pw_vali = document.querySelector('#valiPw');
	const pw_vali_chk = document.querySelector('#valiPwCkCk');
	const name_vali = document.querySelector('#valiName');
	const birth_vali = document.querySelector('#valiBirth');
	const tell_vali = document.querySelector('#valiTell');
	const terms_vali = document.querySelector('#valiChk');
	
	//서브밋 조건
	let pw_bool = true;
	let pw_ck_bool = true;
	let name_bool = true;
	let birth_bool = true;
	let tell_bool = true;
	let terms_bool = true;
	
	
	
	//조건검사
	if(mem_pw == ''){
		str_pw_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		pw_bool = false;
	}
	else if (!mem_pw.match(password_rule)) {
		str_pw_ck += '<div class="my-invalid">입력한 비밀번호가 규정에 어긋납니다.</div>';
		pw_bool = false;
	}
	
	if(mem_pw_ck == ''){
		str_ch_chk += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		pw_ck_bool = false;
	}
	
	else if(!mem_pw_ck.match(password_rule)){
		str_ch_chk += '<div class="my-invalid">입력한 비밀번호가 규정에 어긋납니다.</div>';
		pw_ck_bool = false;
	}
	else if(mem_pw_ck != mem_pw){
		str_ch_chk += '<div class="my-invalid">입력한 비밀번호가 동일하지 않습니다.</div>';
		pw_ck_bool = false;
	}
	if(mem_name == ''){
		str_name_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		name_bool = false;
	}
	if(mem_birth == ''){
		str_birth_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		birth_bool = false;
	}
	if(mem_tell == ''){
		str_tell_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		tell_bool = false;
	}
	if(terms_chk.checked == false){
		str_terms_vali += '<div class="my-invalid">약관에 동의하여야 가입이 가능합니다.</div>';
		terms_bool = false;
	}
	//리턴 안되는 이유 확인
	//조건 입력
	pw_vali.insertAdjacentHTML('afterbegin', str_pw_ck);
	pw_vali_chk.insertAdjacentHTML('afterbegin',str_ch_chk);
	name_vali.insertAdjacentHTML('afterbegin',str_name_ck);
	birth_vali.insertAdjacentHTML('afterbegin',str_birth_ck);
	tell_vali.insertAdjacentHTML('afterbegin',str_tell_ck);
	terms_vali.insertAdjacentHTML('afterbegin',str_terms_vali);
	
	let result_data = pw_bool &&  pw_ck_bool && name_bool && birth_bool && tell_bool && terms_bool;
	
	return result_data;
	
}

//회원가입 조건에 따라 실행
function join(){
	const is_valid = regMember();
	const join_form = document.querySelector('#regMemberForm');
	console.log(is_valid)
	
	if(!is_valid){
		return
	}
	//true 면 회원가입 진행
	else{		
		join_form.submit();
	}
	
}

//로그인 페이지 이동
function loginForm() {
	swal.fire({
		title: "로그인 페이지",
		html: "로그인 페이지로<br>이동합니다.",
		icon: "success",
		button: '확인',
	}).then((r)=>{
		location.href='/member/loginForm';
	})
}

//로그아웃
function logout(){
	swal.fire({
		title: "로그아웃",
		html: "로그아웃<br>하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r)=>{
		if(r.isConfirmed){
			location.href = '/logout';
		}
		else if(r.isDismissed){
			swal.fire({
				title:"로그아웃",
				html: "로그아웃이<br> 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	})
}

//매칭 신청 페이지
function regMatch(role){
	if(role == 'anonymousUser'){
		swal.fire({
			html: "로그인한 회원만<br>접근 가능합니다.",
			icon: 'warning',
			button: '확인',
		})
	}
	else{
	swal.fire({
			html: "매칭 등록 페이지로<br> 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/match/regMatchForm';
		})
	}
}
//랜덤 매칭
function randomMatch(role){
	if(role == 'anonymousUser'){
		swal.fire({
			html: "로그인한 회원만<br> 접근 가능합니다.",
			icon: 'warning',
			button: '확인',
		})
	}
	else{
	swal.fire({
			html: "랜덤 매칭 페이지로<br> 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/match/randomMatchForm';
		})
	}
}

//경기 결과 등록(admin)
function regMatchResult(){
		swal.fire({
			html: "경기 결과 등록<br> 페이지로 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{
			location.href='/admin/regMatchResultForm';
		});
}

//메인 페이지 이동
function moveMainPage(){
	swal.fire({
			title: "메인 페이지로 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{
			location.href='/';
		});
}

//내 정보 페이지 이동
function myInfoForm(role){
	if(role == 'anonymousUser'){
		swal.fire({
			html: "로그인한 회원만<br> 접근 가능합니다.",
			icon: 'warning',
			button: '확인',
		})
	}
	else{
		swal.fire({
			html: "내정보 페이지로<br> 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/member/myInfoForm';
		})
	}
}

//클럽 생성 페이지 이동
function createClub(role){
	if(role == 'anonymousUser'){
		swal.fire({
			html: "로그인한 회원만<br> 접근 가능합니다.",
			icon: 'warning',
			button: '확인',
		})
	}
	else{
		swal.fire({
			html: "클럽 생성 페이지로<br> 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/club/createClubForm';
		})
	}	
}

//클럽 목록 페이지 이동
function regcClub(role){
	if(role == 'anonymousUser'){
		swal.fire({
			html: "로그인한 회원만<br> 접근 가능합니다.",
			icon: 'warning',
			button: '확인',
		})
	}
	else{
		swal.fire({
			html: "클럽 목록 페이지로<br> 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/club/clubList';
		})
	}	
}

//승급처리(admin)
function setAdvancementResult(){
	swal.fire({
			html: "승급 요청 목록<br> 페이지로 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/admin/advancementRequestForm';
		})
}

//블랙리스트 관리(admin)
function regBlackMem(){
	swal.fire({
			html: "블랙리스트 관리<br> 페이지로 이동합니다.",
			icon: 'success',
			button: '확인',
		}).then((r)=>{			
			location.href='/admin/regBlackListForm';
		})
}



//랭킹 페이지 이동
function rankingForm(){
	swal.fire({
		html: "랭킹 페이지로<br> 이동합니다.",
		icon: 'success',
		button: '확인',
	}).then((r)=>{			
		location.href='/league/rankingPage';
	})	
}

//보드 페이지 이동
function boardForm(){
	swal.fire({
		html: "게시판 페이지로<br> 이동합니다.",
		icon: 'success',
		button: '확인',
	}).then((r)=>{			
		location.href='/board/boardForm';
	})		
}


//공지사항 페이지 이동
function noticeBoardForm(){
	swal.fire({
		html: "공지사항 페이지로<br> 이동합니다.",
		icon: 'success',
		button: '확인',
	}).then((r)=>{			
		location.href='/board/noticeBoardForm';
	})		
}
