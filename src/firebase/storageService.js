// =====================================================================
// Student Hive — Firebase Storage Service
// =====================================================================
// Handles file uploads/downloads for assignments, materials, certificates.

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload a file to Firebase Storage with progress tracking
 * @param {File} file - The file to upload
 * @param {string} path - Storage path (e.g. 'assignments/uid/filename.pdf')
 * @param {function} onProgress - Optional callback(percent) for upload progress
 * @returns {Promise<{url: string, path: string, name: string, size: number}>}
 */
export function uploadFile(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(percent);
      },
      (error) => {
        console.error('[Storage] Upload error:', error);
        reject(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url,
          path,
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
    );
  });
}

/**
 * Upload an assignment submission
 */
export async function uploadAssignmentFile(file, studentUid, assignmentId, onProgress) {
  const path = `assignments/${studentUid}/${assignmentId}/${file.name}`;
  return uploadFile(file, path, onProgress);
}

/**
 * Upload study material
 */
export async function uploadMaterialFile(file, subjectId, onProgress) {
  const path = `materials/${subjectId}/${Date.now()}_${file.name}`;
  return uploadFile(file, path, onProgress);
}

/**
 * Upload a certificate document
 */
export async function uploadCertificateFile(file, studentUid, onProgress) {
  const path = `certificates/${studentUid}/${Date.now()}_${file.name}`;
  return uploadFile(file, path, onProgress);
}

/**
 * Upload a profile avatar
 */
export async function uploadAvatar(file, uid, onProgress) {
  const path = `avatars/${uid}/${file.name}`;
  return uploadFile(file, path, onProgress);
}

/**
 * Get the download URL for a storage path
 */
export async function getFileURL(path) {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

/**
 * Delete a file from storage
 */
export async function deleteFile(path) {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
}

/**
 * List all files in a storage directory
 */
export async function listFiles(directoryPath) {
  const dirRef = ref(storage, directoryPath);
  const result = await listAll(dirRef);
  const files = await Promise.all(
    result.items.map(async (itemRef) => ({
      name: itemRef.name,
      path: itemRef.fullPath,
      url: await getDownloadURL(itemRef)
    }))
  );
  return files;
}
