import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Product } from '../_models';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
    token: any;
    baseUrl = environment.apiUrl + environment.basePath;
    fmnUrl = "https://chekkitcidev.azurewebsites.net/api/v2";
    fmnProd = "https://chekkitciprod.azurewebsites.net/api/v2"

    public productSource = new BehaviorSubject<Product>(null);
    productDetails$ = this.productSource.asObservable();

    public batchSource = new BehaviorSubject<any>(null);
    batchDetails$ = this.batchSource.asObservable();


    private statsFilterSource = new BehaviorSubject<any>(null);
    statsFilter$ = this.statsFilterSource.asObservable();

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }


    updateProductFilterSource(data) {
        this.statsFilterSource.next(data);
    }


    //=======================UPDATE PRODUCT DETAILS========================================

    updateProductDetails(productDetails: Product){
        this.productSource.next(productDetails);
    }

    //=======================UPDATE BATCH DETAILS========================================

    updateBatchDetails(batchDetails){
        this.batchSource.next(batchDetails);
    }

    linkChekkitAccount(data){
        return this.http.post(this.baseUrl +"/gs1/account-link?gs1UserKey=", data )
    }

    getProduct(slug: string) {
        return this.http.get(this.baseUrl + `/products/${slug}`);
    }

    getAllUserProducts(userId: number) {
        return this.http.get(this.baseUrl + `/products/all_products/${userId}`);
    }
    getAllUserProductReports(userId: number) {
        return this.http.get(this.baseUrl + `/products/product-reports/${userId}`);
    }
    getUserLineGRaphAnalytics(userId: number) {
        return this.http.get(this.baseUrl + `/products/line-graph/${userId}`);
    }

    getContainerBatch(subProductId: number){
        return this.http.get(this.baseUrl+`/gs1/containers/${subProductId}`)
    }
    getUserproductSubProductAnalytics(userId: number) {
        return this.http.get(this.baseUrl + `/products/pb-line-graph/${userId}`);
    }
    getUserRewardPieChartAnalytics(userId: number) {
        return this.http.get(this.baseUrl + `/products/rewards-piegraph/${userId}`);
    }
    getProductDetails(productId: any){
        return this.http.get(this.baseUrl+`/gs1/products/${productId}`)
    }
    getChekkitProducts(){
        return this.http.get(this.baseUrl+`/gs1/user-products`)
    }

    loadContainer(data: any){
        return this.http.post(this.baseUrl+`/gs1/load-container`, data)
    }

    updatePackageLevel(data: any, subProductId: any){
        return this.http.put(this.baseUrl+`/gs1/package-level/${subProductId}`, data)
    }

    receiveContainer(data: any){
        return this.http.post(this.baseUrl+`/gs1/receiving`, data)
    }
    getUserScanHistryAnalytics(userId: number) {
        return this.http.get(this.baseUrl + `/products/scanhist-graph/${userId}`);
    }
    getUserSurveyQestRespAnalytics(userId: number) {
        return this.http.get(this.baseUrl + `/products/surveyqustresp-graph/${userId}`);
    }
    getAllProductBatches(productId) {
        return this.http.get(this.baseUrl + `/products/all_product_batches/${productId}`);
    }
    getAllUserProductBatches(userId: number) {
        return this.http.get(this.baseUrl + `/products/all_user_product_batches/${userId}`);
    }
    getLastExportHistory( batch_num) {
        return this.http.get(this.baseUrl + `/products/get-user-pin-export-history/${batch_num}`);
    }
    updatePinExportHistory(userId: number, data: any) {
        return this.http.post(this.baseUrl + `/products/update-pin-export-history/${userId}`, data);
    }
    create_product(product: any) {

        let payloadObj = {};

        // for(var pair of product.entries()){
        //     console.log(pair)
        // payloadObj[pair[0]] = pair[1];
        // }
        // for (var i = 0; i < product.length; i += 1) {
        //     var x=product[i];
        //     // formData.append(x.NAME, x.VALUE);
        //     console.log(x);
        // }
        // // for (const key in product) {
        //     console.log(product[key])

        //     fd.append(key, formDataDictionary[key]);
        //   }
        // product.forEach(function(value, key){
        //     payloadObj[key] = value;
        // });
        // console.log(payloadObj);
        // console.log(product);


        return this.http.post(this.baseUrl + `/products/`,

        product);

    }
    create_package_level(product: any){
        return this.http.post(this.baseUrl + `/gs1/package-level`, product)
    }
    get_gs1_locations(){
        return this.http.get(this.baseUrl+ `/gs1/locations`)
    }

    get_gs1_package_level(productId){
        return this.http.get(this.baseUrl+ `/gs1/package-level/${productId}`)
    }

    serialize(location: any){
        return this.http.post(this.baseUrl, location)
    }

    comission_product(data: any){
        return this.http.post(this.baseUrl+`/gs1/commission`, data)
    }

    get_batch_gtin(gtin: any){
        return this.http.get(this.baseUrl + `/gs1/products/batch/${gtin}`)
    }

    get_package_level_serials(subproductId: any, packageLevelId: any ){
        return this.http.get(this.baseUrl+ `/gs1/package-level/serials/${subproductId}/${packageLevelId}?page=1&per_page=10000000000`)
    }

    run_shipping(data: any){
        return this.http.post(this.baseUrl+`/gs1/sscc`, data)
    }

    packing(data: any){
      return this.http.post(this.baseUrl+`/gs1/packing`, data)
    }

    comfirm_shipping(data: any){
        return this.http.post(this.baseUrl+`/gs1/shipping`, data)
    }

    get_shipping_summary(subproductId: any){
        return this.http.get(this.baseUrl+ `/gs1/shipping/summary/${subproductId}`)
    }

    create_batch(sub_product: any) {
        return this.http.post(this.baseUrl + `/products/sub-products/`, sub_product);
    }
    // /api/v2/products/generate-pin-request
    request_pin(data: any) {
        return this.http.post(this.baseUrl + `/products/generate-pin-request/`, data);
    }
    createReward(id: number, survey_reward: any) {
        return this.http.post(this.baseUrl + `/survey-reward/${id}`, survey_reward);
    }
    generate_pin(batchProductId, product_batch: any) {
        return this.http.post(this.baseUrl + `/products/generate-pin/${batchProductId}`, product_batch);
    }
    getAllProductReward(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/${user_id}`);
    }
    attach_reward(product: any, productId) {
        return this.http.post(this.baseUrl + `/survey-reward/attach-reward/${productId}/${product.rewardId}`, product);
    }
    getAllUserProductPins(userId: number) {
        return this.http.get(this.baseUrl + `/products/get-userpin-generated/${userId}`);
    }
    getProductPins(slug: any, per_page: number, pin_prev = "", pin_next = "") {
        return this.http.get(this.baseUrl + `/products/get-product-pins/${slug}?per_page=${per_page}&pin_prev=${pin_prev}&pin_next=${pin_next}`);
    }
    getProductPinsExport(slug: any, per_page: number, pin_prev = "", pin_next = "") {
        return this.http.get(this.baseUrl + `/products/get-product-pins-for-export/${slug}?per_page=${per_page}&pin_prev=${pin_prev}&pin_next=${pin_next}`);
    }
    getAllProductPins(slug: any) {
        return this.http.get(this.baseUrl + `/products/get-all-product-pins/${slug}`);
    }
    delete_product(id: number) {
        return this.http.delete(this.baseUrl + `/products/${id}`);
    }
    update_product(slug: any, productData: any) {
        return this.http.put(this.baseUrl + `/products/update-product/${slug}`, productData);
    }
    update_subProduct(batch_num: any, productData: any) {
        return this.http.put(this.baseUrl + `/products/update-sub-product/${batch_num}`, productData);
    }

// analytics calls
    getScansByDate(id: any,startDate,endDate) {
        return this.http.get(this.baseUrl + `/products/get-scan-statistics-by-date/${id}/${startDate}/${endDate}`);
    }

    getProductScans(id: any) {
        return this.http.get(this.baseUrl + `/products/get-product-scan-statistics/${id}`);
    }

    trackPinExport(id: any) {
        return this.http.get(this.baseUrl + `/products/get-product-pins-for-export/${id}/status`);
    }
    exportProductPins(id: any) {
        return this.http.get(this.baseUrl + `/products/get-product-pins-for-export/${id}`);
    }

    // gs1 integration

    getPackageLevel(productId: number){
        return this.http.get(this.baseUrl + `/gs1/package-level/${productId}`)
    }

    unpackPackages(data: any){
      return this.http.post(this.baseUrl + `/gs1/unpacking`, data)
    }

    serializeProduct(data: any){
      return this.http.post(this.baseUrl + `/gs1/serialization`, data)
    }

    shippingSummary(subProductId: any){
      return this.http.get(this.baseUrl+`/gs1/shipping/summary/${subProductId}`)
    }

    getDashboardInfo(fromDate: string, toDate: string){
      return this.http.get(this.baseUrl + `/gs1/dashboard?fromDate=${fromDate}&toDate=${toDate}`)
    }

    getShippedItem(){
      return this.http.get(this.baseUrl + `/gs1/received-items`)
    }

    // Antifake calls
    createCampaign(data: any){
      return this.http.post(this.baseUrl + "/campaigns", data);
    }

    requestLabels(data: any){
      return this.http.post(this.baseUrl + '/labels/request', data);
    }

    getLabels(){
      return this.http.get(this.baseUrl+'/labels');
    }

    getLabelTracking(orderID: any){
      return this.http.get(this.baseUrl+ `/labels/tracking/${orderID}`)
    }

    create_sub_product(data: any){
      return this.http.post(this.baseUrl+"/products/sub-products", data)
    }

    getAssignedLabels(){
      return this.http.get(this.baseUrl+"/labels/assigned-labels")
    }

    getTraceabilityAnalytics(fromDate: any, toDate: any){
      return this.http.get(this.baseUrl+`/gs1/dashboard?fromDate=${fromDate}&toDate=${toDate}`)
    }

    getStockCount(){
      return this.http.get(this.baseUrl + `/gs1/stock-count`)
    }

    postStockCount(data: any){
      return this.http.post(this.baseUrl + `/gs1/stock-count`, data)
    }

    viewStockDetails(id: any){
      return this.http.get(this.baseUrl+ `/gs1/stock-count/${id}`)
    }

    // product recall
    getRecallHistory(){
      return this.http.get(this.baseUrl+`/product-recall`)
    }

    recallProduct(data: any){
      return this.http.post(this.baseUrl + `/product-recall`, data)
    }

    distributorsRecall(batch: any){
      return this.http.get(this.baseUrl+`/product-recall/distributors/${batch}`)
    }



    // gaming insights

    getDashboardMetrics(){
      return this.http.get(this.fmnProd+'/amazing-day-campaign/dashboard-metrics')
    }

    getRedemptionlist(){
      return this.http.get(this.fmnProd+`/amazing-day-campaign/redemption-list`)
    }

    updateRedemptionPoint(data: any){
      return this.http.put(this.fmnProd+`/amazing-day-campaign/redemption-point`, data)
    }

    getLeaderboardList(){
      return this.http.get(this.fmnProd+`/amazing-day-campaign/leaderboard-list`)
    }

    getLeaderboardUser(){
      return this.http.get(this.fmnProd+`/amazing-day-campaign/leaderboard-user`)
    }

    addTrivia(data: any){
      return this.http.post(this.baseUrl+`/survey`, data)
    }

    upload(data: any){
      return this.http.post(this.baseUrl+`/upload`, data)
    }

    getTrivias(){
      return this.http.get(this.fmnProd+`/amazing-day-campaign/trivia`)
    }

    getFmnRewards(){
      return this.http.get(this.fmnProd+`/amazing-day-campaign/fmn-rewards`)
    }

    selectWinners(data){
      return this.http.post(this.fmnProd+`/amazing-day-campaign/select-winner`, data)
    }

    updateTrivia(slug: any, data){
      return this.http.put(this.baseUrl+`/survey/update-survey/${slug}`, data)
    }

    }
