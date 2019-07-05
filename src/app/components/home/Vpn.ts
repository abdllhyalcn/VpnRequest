export interface Vpn {
    Kullanici_Adi?:Username;
    Request_ID?;
    Baslangic_Tarihi?;
    Bitis_Tarihi?;
    Talep_Acan?;
    KullaniciType?;
    //Grup_Adi should be VpnGroup object type.
    Grup_Adi?:string[];
}
export interface Username{
    userNameSurname?;
    code?;
}
export interface VpnGroup{
    Grup_Adi?;
}