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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FindAllToursDto } from './dto/find-all-tours.dto';
import { SupplierJwt } from '../suppliers/supplier-jwt.decorator';
import { SupplierJwtBody } from '../suppliers/types';
import { SupplierAuthGuard } from '../suppliers/supplier-auth.guard';

@Controller('tours')
@ApiTags('Tours Controller')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createTourDto: CreateTourDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.toursService.create(createTourDto, supplier.sub);
  }

  @Get()
  findAll(@Query() query: FindAllToursDto) {
    return this.toursService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.toursService.update(+id, updateTourDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  remove(@Param('id') id: string, @SupplierJwt() supplier: SupplierJwtBody) {
    return this.toursService.remove(id, supplier.sub);
  }
}
