import {Injectable, Injector, TemplateRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductModel} from '../../models/Products/product.model';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {OrderModel} from '../../models/Orders/order.model';
import {InvoiceModel} from '../../models/Invoice/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  modalRef: BsModalRef;
  selectedImage = null;
  startLoadingFlag = false;
  imageFormData = new FormData();
  error: {
    error: string,
    message: string,
    statusCode: number
  };


  // For Connection
  onlineEvent: Observable<Event>;

  setIsOnline(value: boolean) {
    sessionStorage.removeItem('isOnline');
    sessionStorage.setItem('isOnline', String(value));
  }

  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];

  backToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 20;
  }

  //
  showErrorDialog(error: any, template: any) {
    this.hideSpinner();
    this.error = error;
    this.openModal(template);
  }


  constructor(private dialog: MatDialog, private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private injector: Injector,
              private snackBar: MatSnackBar) {
  }

  state: string;


  hideDialog() {
    this.dialog.closeAll();
  }

  // Showing Modals
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  hideModal() {
    this.modalRef.hide();
  }


  // For Spinners
  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

  productDetails(product: ProductModel) {
    this.router.navigate([`/products/${product.id}`, product.subCategoryId], {
      queryParams: {
        Product: product.name,
        Available: product.inStock
      }
    });
  }

  onImageSelect(event) {
    const file = event.files[0] as File;
    const imageReader = new FileReader();
    this.imageFormData.append('image', file);
    imageReader.onload = (d: any) => {
      this.selectedImage = d.target.result;
    };
    imageReader.onerror = (e: any) => {
      console.log('File could not be read: ' + e.target.error.code);
    };
    imageReader.readAsDataURL(file);
  }


  adjustData() {
    this.imageFormData.delete('image');
    this.selectedImage = null;
    this.startLoadingFlag = false;
  }

  // data sources
  orderDataSource: MatTableDataSource<OrderModel> = new MatTableDataSource<OrderModel>([]);
  invoicesDataSource: MatTableDataSource<InvoiceModel> = new MatTableDataSource<InvoiceModel>([]);

  // for toast messages
  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
  navigateToOrder(order: OrderModel) {
    this.router.navigate(['/orders', order.id], {
      queryParams: {
        status: order.status
      }
    });
  }


}
