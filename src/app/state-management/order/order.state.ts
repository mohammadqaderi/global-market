import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {OrderService} from '../../services/order/order.service';
import {OrderActions, OrderStateModel} from './order.actions';
import {OrderModel} from '../../models/Orders/order.model';
import FetchUserOrders = OrderActions.FetchUserOrders;
import UpdateOrder = OrderActions.UpdateOrder;
import {append, patch, removeItem, updateItem} from '@ngxs/store/operators';
import CancelOrder = OrderActions.CancelOrder;
import ClearOrdersFromStorage = OrderActions.ClearOrdersFromStorage;
import PushOrder = OrderActions.PushOrder;


@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: null
  }
})

@Injectable()
export class OrderState {
  constructor(private orderService: OrderService) {
  }

  @Selector()
  static Orders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(FetchUserOrders)
  fetchUserInvoices(ctx: StateContext<OrderStateModel>, action: FetchUserOrders) {
    return this.orderService.getUserOrders().pipe(
      tap((data: OrderModel[]) => {
        ctx.setState({
          orders: data
        });
      })
    );
  }

  @Action(UpdateOrder)
  updateOrder(ctx: StateContext<OrderStateModel>, action: UpdateOrder) {
    return this.orderService.updateOrder(action.id, action.updateOrderDto).pipe(
      tap((updatedOrder: OrderModel) => {
        ctx.setState(patch({
          orders: updateItem<OrderModel>(order => order.id === action.id, updatedOrder)
        }));
      })
    );
  }

  @Action(PushOrder)
  pushOrder(ctx: StateContext<OrderStateModel>, action: PushOrder) {
    ctx.setState(patch({
      orders: append<OrderModel>([action.order])
    }));
  }

  @Action(ClearOrdersFromStorage)
  clearOrdersFromStorage(ctx: StateContext<OrderStateModel>, action: ClearOrdersFromStorage) {
    ctx.setState({
      orders: null
    });
  }

  @Action(CancelOrder)
  cancelOrder(ctx: StateContext<OrderStateModel>, action: CancelOrder) {
    return this.orderService.cancelOrder(action.id).pipe(
      tap(() => {
        ctx.setState(patch({
          orders: removeItem<OrderModel>(order => order.id === action.id)
        }));
      })
    );
  }
}
