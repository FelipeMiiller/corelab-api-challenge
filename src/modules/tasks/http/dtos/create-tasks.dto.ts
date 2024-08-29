import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { ColorsTasks } from 'src/common/constants/colorsTask';

export class CreateTasksDto {
  @ApiProperty({ type: String, name: 'title', required: true, description: 'The title of the task', })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: String, name: 'description', required: false, description: 'The description of the task', })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: Boolean, name: 'isFavorite', default: false, required: false, description: 'True to favorite the task', })
  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean = false;

  @ApiProperty({ type: String, name: 'color', required: false, default: ColorsTasks[0], description: 'The color of the task', enum: ColorsTasks })
  @IsIn(ColorsTasks)
  @IsOptional()
  color?: string = ColorsTasks[0];

  @ApiProperty({ type: String, name: 'fileURL', required: false, description: 'The file URL of the task' })
  @IsUrl()
  @IsOptional()
  filePath?: string;
}
