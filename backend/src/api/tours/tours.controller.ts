import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FindAllToursDto } from './dto/find-all-tours.dto';
import { SupplierJwt } from '../suppliers/supplier-jwt.decorator';
import { SupplierJwtBody } from '../suppliers/types';
import { SupplierAuthGuard } from '../suppliers/supplier-auth.guard';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { DeletePhotoDto } from './dto/delete-photo.dto';
import { BookTourDto } from './dto/book-tour.dto';
import { FindAllTourReservationsDto } from 'src/api/tours/dto/find-all-tour-reservations.dto';

@Controller('tours')
@ApiTags('Tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  create(
    @Body() createTourDto: CreateTourDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.createTour(createTourDto, supplier.sub);
  }

  @Get()
  findAll(@Query() query: FindAllToursDto) {
    return this.toursService.findAllTours(query);
  }

  @Get('/filters')
  getTourFilters() {
    return this.toursService.getTourFilters();
  }

  @Get('/reservations')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  getSupplierReservations(
    @Query() query: FindAllTourReservationsDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.getSupplierTourReservations(query, supplier.sub);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    format: 'uuid',
    required: true,
    description: 'Tour ID (UUID)',
  })
  findOne(@Param('id') id: string) {
    return this.toursService.findOneTour(id);
  }

  @Post('/book')
  bookTour(@Body() bookTourDto: BookTourDto) {
    return this.toursService.bookTour(bookTourDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.updateTour(id, updateTourDto, supplier.sub);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  remove(@Param('id') id: string, @SupplierJwt() supplier: SupplierJwtBody) {
    return this.toursService.deleteTour(id, supplier.sub);
  }

  @Post('photos')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  uploadPhoto(
    @Body() uploadPhotoDto: UploadPhotoDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.uploadPhoto(uploadPhotoDto.photo, supplier.sub);
  }

  @Delete('photos/:id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  deletePhoto(
    @Param() params: DeletePhotoDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.deletePhoto(params.photoId, supplier.sub);
  }
}
