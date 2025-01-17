export interface PermissionType {
  _id: string;
  name: string;
}

export interface Permission {
  _id: string;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
  permissionTypeId: PermissionType;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  attachment: string;
}
