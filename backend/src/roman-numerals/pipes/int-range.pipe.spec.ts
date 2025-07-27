import { IntRangePipe } from './int-range.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('IntRangePipe', () => {
    const pipe = new IntRangePipe(1, 3999);
    it('should be defined', () => {
        expect(new IntRangePipe(0, 0)).toBeDefined();
    });

    it('throws a bad request exception when the value is not in the range', () => {
        expect(() => pipe.transform(-1, {} as ArgumentMetadata)).toThrow(BadRequestException);
        expect(() => pipe.transform(0, {} as ArgumentMetadata)).toThrow(BadRequestException);
        expect(() => pipe.transform(4000, {} as ArgumentMetadata)).toThrow(BadRequestException);
        expect(() => pipe.transform(16000, {} as ArgumentMetadata)).toThrow(BadRequestException);
    });

    it('returns the value when it is in the range', () => {
        expect(pipe.transform(1, {} as ArgumentMetadata)).toEqual(1);
        expect(pipe.transform(1000, {} as ArgumentMetadata)).toEqual(1000);
        expect(pipe.transform(3999, {} as ArgumentMetadata)).toEqual(3999);
    });
});
