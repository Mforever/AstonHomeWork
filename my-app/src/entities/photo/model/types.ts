/**
 * Типы для сущности "Фото" (Photo)
 */

export interface Photo {
  /** Уникальный идентификатор фото */
  id: number;
  /** ID альбома, к которому относится фото */
  albumId: number;
  /** Название фото */
  title: string;
  /** URL полного изображения */
  url: string;
  /** URL миниатюры */
  thumbnailUrl: string;
}

/**
 * Тип для создания нового фото
 */
export type CreatePhotoDto = Omit<Photo, 'id'>;

/**
 * Тип для обновления фото
 */
export type UpdatePhotoDto = Partial<Omit<Photo, 'id'>> & Pick<Photo, 'id'>;

/**
 * Тип для фото с дополнительной информацией
 */
export interface PhotoWithDetails extends Photo {
  albumTitle?: string;
  userName?: string;
}