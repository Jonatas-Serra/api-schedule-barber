import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkDto } from './dto/create-works.dto';
import { UpdateWorkDto } from './dto/update-works.dto';
import { Work, WorkDocument } from './entities/works.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name)
    private workModel: Model<WorkDocument>,
  ) {}

  public async create(createWorkDto: CreateWorkDto) {
    const checkWork = await this.workModel
      .findOne({ name: createWorkDto.name })
      .exec();
    if (checkWork) {
      return { message: 'Work already exists' };
    }
    const createdWork = new this.workModel(createWorkDto);
    return createdWork.save();
  }

  findAll() {
    return this.workModel.find().exec();
  }

  findOne(id: string) {
    return this.workModel.findById(id).exec();
  }

  update(id: string, updateWorkDto: UpdateWorkDto) {
    return this.workModel.findByIdAndUpdate(id, updateWorkDto).exec();
  }

  remove(id: string) {
    return this.workModel.findByIdAndDelete(id).exec();
  }
}
