import { Component, Input, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ImageService } from '@mbiz/shared/services';
import { MbizAlertComponent } from '@mbiz/shared/alert';
import { FileImage, ServerImage } from '@mbiz/shared/models';

import { MbizFormInputBase } from '../mbiz-form-input-base';

import * as _ from 'lodash';

@Component({
    selector: 'mbiz-img-input',
    templateUrl: './mbiz-img-input.component.html',
    styleUrls: ['./mbiz-img-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => MbizImgInputComponent),
        }
    ]
})
export class MbizImgInputComponent extends MbizFormInputBase {
    private readonly _imageService: ImageService;
    private readonly _fileImages: Array<FileImage>;

    private _loadingCounter: number;

    @ViewChild('alerts')
    public alerts: MbizAlertComponent;

    @ViewChild('fileInput')
    public fileInput: ElementRef;

    @Input('label')
    public label: string;

    @Input('type')
    public type: string = 'image/*';

    @Input('multiple')
    public multiple: boolean = false;

    public get fileImages(): Array<FileImage> {
        return this._fileImages;
    }

    public get serverImages(): Array<ServerImage> {
        return this.getServerImages();
    }

    public constructor(imageService: ImageService) 
    {
        super();

        this._imageService = imageService;

        this._loadingCounter = 0;
        this._fileImages = [];
    }

    public onInit(): void {
    }

    public onDestroy(): void {
    }

    public openDialog(): void {
        this.fileInput.nativeElement.click();
    }

    public removeFileImage(image: FileImage): void {
        this._imageService.abortUpload(image);
        _.remove(this.fileImages, (img) => {
            return img === image;
        });
    }

    public removeServerImage(image: ServerImage): void {
        this.load(this._imageService.delete(image)).subscribe(
            result => {
                const images = this.getServerImages();

                _.remove(images, (img) => {
                    return img === image;
                });

                this.setServerImages(images);
            },
            error => {
                this.alerts.error('common.error-message.something-went-wrong');
            }
        );
    }

    public onFilesChanged(files: Array<File>): void {
        //Reset input so that onChange can fire again even if the selection does not change.
        //this.fileInput.nativeElement.value = this.fileInput.nativeElement.defaultValue;

        const fileImages = _.map(files, (file) => this._imageService.loadFromFile(file));
        this.load(forkJoin(fileImages)).subscribe((images: Array<FileImage>) => {
            if (this.multiple) {
                const uploads: Array<Observable<ServerImage>> = [];

                _.each(images, (fileImage) => {
                    this.fileImages.push(fileImage);
                    uploads.push(this._imageService.upload(fileImage));
                });

                this.load(forkJoin(uploads)).subscribe(
                    serverImageArray => {
                        this.fileImages.splice(0, this.fileImages.length);
                        const serverImages = this.getServerImages();

                        _.each(serverImageArray, (serverImage) => {
                            serverImages.push(serverImage);
                        });

                        this.setServerImages(serverImages);
                    }
                );
            }
            else {
                const serverImages = this.getServerImages();
                if (serverImages.length > 0) {
                    this.removeServerImage(serverImages[0]);
                }

                if (this.fileImages.length > 0) {
                    this.removeFileImage(this.fileImages[0]);
                }

                this.fileImages.push(images[0]);
                this.load(this._imageService.upload(images[0])).subscribe(
                    serverImage => {
                        this.removeFileImage(this.fileImages[0]);
                        this.setServerImages([serverImage]);
                    }
                );
            }
        });
    }

    public getServerImages(): Array<ServerImage> {
        if (this.control.value) {
            if (_.isArray(this.control.value)) {
                return this.control.value as Array<ServerImage>;
            }

            return [this.control.value as ServerImage];
        }

        return [];
    }

    public setServerImages(value: Array<ServerImage>) {
        if (value) {
            if (this.multiple) {
                this.control.setValue(value);
            }
            else {
                this.control.setValue(value[0]);
            }
        }
        else {
            this.control.setValue(null);
        }
    }

    private load<T>(observable: Observable<T>): Observable<T> {
        this._loadingCounter += 1;
        this.control.markAsPending();
        return observable.pipe(
            finalize(() => {
                this._loadingCounter = Math.max(this._loadingCounter - 1, 0);
                if (this._loadingCounter === 0) {
                    this.control.markAsDirty();
                }
            })
        );
    }
}
