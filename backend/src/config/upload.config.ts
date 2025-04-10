// src/config/upload.config.ts
import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import * as path from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads', // Path where files will be stored
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename); // Set the unique filename
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size (5MB)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (!allowedMimeTypes.includes(file.mimetype)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return cb(
        new BadRequestException(
          'Invalid file type. Only JPEG and PNG allowed.',
        ),
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cb(null, true); // File type is valid
  },
};
