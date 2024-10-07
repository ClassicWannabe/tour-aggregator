import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('tours')
@ApiTags('Tours Controller')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  create(@Body() createTourDto: CreateTourDto) {
    console.log('createTourDto', createTourDto);
    // console.log(photos);
    return this.toursService.create(createTourDto);
  }

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toursService.remove(+id);
  }
}
