export const PERMISSION_TABLE_COLUMNS = [
  {
    name: 'users.name',
    prop: 'fullName',
    width: 180,
  },
  {
    name: 'permissionType.name',
    prop: 'permissionTypeId.name',
    with: 180,
  },
  {
    name: 'startDate.name',
    prop: 'startDate',
    width: 150,
  },
  {
    name: 'endDate.name',
    prop: 'endDate',
    width: 100,
  },
  {
    name: 'description.name',
    prop: 'description',
    width: 300,
  },
  {
    name: 'status.name',
    prop: 'status',
    width: 150,
  },
  {
    name: 'attachment.download',
    cellTemplate: undefined, // Aquí será asignada dinámicamente en el componente
    width: 150,
  },
];
