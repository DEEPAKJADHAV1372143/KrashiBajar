import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Myapi {
  constructor(private http: HttpClient) {}

  registerFarmer(farmerData: any): Observable<any> {
    return this.http.post('http://localhost:8000/insertFarmer', farmerData);
  }
  loginFarmer(farmerData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/farmer/login', farmerData);
  }

  registerCustomer(customerData: any): Observable<any> {
    return this.http.post('http://localhost:8000/insertCustomer', customerData);
  }
  loginCustomer(farmerData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/customer/login', farmerData);
  }

  insertProduct(farmerData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/products', farmerData);
  }

  getProductsByFarmer(fid: string): Observable<any> {
    const url = 'http://localhost:8000/api/products';
    return this.http.get(`${url}/${fid}`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.put(`http://localhost:8000/api/products/${id}/delete`, {});
  }

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:8000/api/products');
  }

  insertOrder(orderData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/orders', orderData);
  }

  getAllOrders(): Observable<any> {
    return this.http.get('http://localhost:8000/api/orders');
  }

  getOrdersByCustomer(cid: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/orders/${cid}`);
  }

  getOrdersByFarmer(farmerId: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/farmer/orders/${farmerId}`);
  }

  private apiUrl = 'http://localhost:8000/api/orders';

  updateOrderStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  updateFarmer(farmerId: number, updateData: any): Observable<any> {
    return this.http.put(`http://localhost:8000/updateFarmer/${farmerId}`, updateData);
  }

  updateCustomer(farmerId: number, updateData: any): Observable<any> {
    return this.http.put(`http://localhost:8000/updateCustomer/${farmerId}`, updateData);
  }

  registerAdmin(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8000/registerAdmin', formData);
  }

  loginAdmin(formData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/adminLogin', formData);
  }

  getAllTables(): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/krashibajar/all');
  }

  private baseUrl = 'http://localhost:8000'; // adjust if needed

  // 1. Update ordertable
  updateOrderStatus2(id: number, isActiveStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateOrderStatus`, { id, isActiveStatus });
  }

  // 2. Update producttable
  updateProductStatus(id: number, isActiveStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProductStatus`, { id, isActiveStatus });
  }

  // 3. Update farmerlogintable
  updateFarmerStatus(farmerId: number, isActiveStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateFarmerStatus`, { farmerId, isActiveStatus });
  }

  // 4. Update customerlogintable
  updateCustomerStatus(customerId: number, isActiveStatus: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateCustomerStatus`, { customerId, isActiveStatus });
  }

  // Update query status
  updateStatus(queryId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/queries/${queryId}/status`, { status });
  }

  // Add new query
  addQuery(queryData: any): Observable<any> {
    return this.http.post('http://localhost:8000/api/queries', queryData);
  }

  getQueries(userId: number, whoText: string): Observable<any> {
    return this.http.get(`http://localhost:8000/api/queries`, {
      params: { userId: userId.toString(), whoText },
    });
  }

  // Get all queries
  getAllQueries(): Observable<any> {
    return this.http.get('http://localhost:8000/api/AllQueries');
  }

  updateQueryStatus(queryId: number, status: string): Observable<any> {
    return this.http.put(`http://localhost:8000/api/queries/${queryId}/status`, { status });
  }
}
