import { ApiProperty} from '@nestjs/swagger';

import { IsBoolean, IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import { ColorsTasks } from 'src/common/constants/colorsTask';

export class UpdateTasksDto {
  @ApiProperty({ type: String, name: 'title', required: false, description: 'The title of the task' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: String, name: 'description', required: false, description: 'The description of the task' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Boolean,
    name: 'isFavorite',
    required: false,
    description: 'True to favorite the task',
  })
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean;

  @ApiProperty({
    type: String,
    name: 'color',
    required: false,
    description: 'The color of the task',
    enum: ColorsTasks,
  })
  @IsIn(ColorsTasks)
  @IsOptional()
  color?: string;

  @ApiProperty({ type: String, name: 'filePath', required: false, description: 'The file URL of the task' })
  @IsUrl()
  @IsOptional()
  filePath?: string;
}
