//Category
export interface CategoryParams {
  offset?: number;
  count?: number;
}

export interface CategoryResult {
  totalCount: number;
  categoryList: CategoryList[];
}

export interface CategoryList {
  id: string;
  number: number;
  title: string;
  status: string;
  order: number;
  createdDate: string;
  modifiedDate: string;
  attachment: Attachment;
}

export interface OrdersParams {
  offset?: number;
  count?: number;
  categoryNumber?: number;
}

export interface OrdersResult {
  totalCount: number;
  orderList: OrderData[];
}

export interface OrderData {
  id: string;
  number: number;
  userId: string;
  message: string;
  title: string;
  url: string;
  createdDate: string;
  status: string;
  attachmentList?: Attachment[];
  category: {
    id: string;
    number: number;
    title: string;
  }
}

export interface OrderDetailResult {
  orderDetail: OrderData
}

//Content
export interface SliderResult {
  data: SliderData[];
  totalCount: number;
}

export interface SliderData {
  attachment: Attachment;
  order: number;
}

export interface ServicesResult {
  data: ServicesData[];
  totalCount: number;
}

export interface ServicesData {
  serviceKey: string;
  attachment: Attachment;
  title: string;
  description: string;
  url: string;
  order: number;
}

export interface ServiceResult {
  data: ServiceData;
}

export interface ServiceData {
  serviceKey: string;
  attachment: Attachment;
  title: string;
  description: string;
}

export interface UsagesResult {
  data: UsagesData[];
  totalCount: number;
}

export interface UsagesData {
  usageKey: string;
  attachment: Attachment;
  title: string;
  url: string;
  order: number;
}

export interface UsageResult {
  data: UsageData;
}

export interface UsageData {
  title: string;
  description: string;
  attachment: Attachment;
  usageKey: string;
}

export interface CarouselResult {
  data: CarouselData[];
  totalCount: number;
}

export interface CarouselData {
  attachment: Attachment;
  title: string;
  url: string;
}

export interface Attachment {
  id: string;
  type: 'Image';
  url: string;
}