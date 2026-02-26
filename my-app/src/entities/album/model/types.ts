/**
 * Типы для сущности "Альбом" (Album)
 */

export interface Album {
  /** Уникальный идентификатор альбома */
  id: number;
  /** ID пользователя, владельца альбома */
  userId: number;
  /** Название альбома */
  title: string;
}

/**
 * Тип для создания нового альбома
 */
export type CreateAlbumDto = Omit<Album, 'id'>;

/**
 * Тип для обновления альбома
 */
export type UpdateAlbumDto = Partial<Omit<Album, 'id'>> & Pick<Album, 'id'>;

/**
 * Тип для альбома с количеством фото
 */
export interface AlbumWithPhotoCount extends Album {
  photoCount: number;
  thumbnailUrl?: string;
}