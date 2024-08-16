
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean,IsIn, IsNotEmpty, IsString} from 'class-validator';
import { ColorsTasks } from 'src/common/constants/colorsTask';




export class CreateTasksDto {
  @ApiProperty({
    type: String,
    name: 'title',
    required: true,
    description: 'The title of the task',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    name: 'description',
    required: false,
    description: 'The description of the task',
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Boolean,
    name: 'isFavorite',
    required: false,
    description: 'True to favorite the task',
  })
  @IsBoolean()
  isFavorite: boolean;

  @ApiProperty({
    type: String,
    name: 'color',
    required: false,
    description: 'The color of the task',
    enum: ColorsTasks
  })
  @IsString()
  @IsIn(ColorsTasks) 
  color: string;

  
}

