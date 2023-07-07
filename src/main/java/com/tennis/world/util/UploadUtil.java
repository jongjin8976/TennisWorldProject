package com.tennis.world.util;

import java.io.File;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.tennis.world.member.vo.MemImgVO;



public class UploadUtil {
	// 단일 파일 업로드 메소드
		public static MemImgVO uploadFile(MultipartFile img) {
			MemImgVO imgVO = null;
			if (img != null && !img.isEmpty()) {
				imgVO = new MemImgVO();

				String originFileName = img.getOriginalFilename();
				String uuid = UUID.randomUUID().toString();
				String extension = originFileName.substring(originFileName.lastIndexOf("."));
				String attachedFileName = uuid + extension;
				try {
					File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
					img.transferTo(file);
					imgVO.setOriginFileName(originFileName);
					imgVO.setAttachedFileName(attachedFileName);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return imgVO;
		}
}
