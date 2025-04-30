import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Profile } from '@/app/account/page';
import { auth, db } from '@/lib/firebase';
import { onSnapshot, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

interface DisputeTableRowDisputesProps {
    onSelectionChange: (updated: Record<Bureau, FormattedDispute[]>,raw: Record<string, boolean>) => void;
    selectedDisputes: Record<string, boolean>;
}
export type Bureau = 'transunion' | 'experian' | 'equifax';
type DisputeEntry = {
    label: string;
  } & {
    [key in Bureau]: string | { value: string; updated: string }[];
  };
  
export type FormattedDispute = {
    field: string;
    value: string;
  };
  
export default function DisputeTableRow({ onSelectionChange, selectedDisputes }: DisputeTableRowDisputesProps) {
    const toggleDispute = (key: string) => {
        const updatedSelectedDisputes = { ...selectedDisputes, [key]: !selectedDisputes[key] };
        const formattedDisputes = formatDisputes(updatedSelectedDisputes);
        onSelectionChange(formattedDisputes, updatedSelectedDisputes);
      };
      

      const [user] = useAuthState(auth);
      const [profile, setProfile] = useState<Profile | null>(null);
    
      useEffect(()=>{
      try {
         if(!user) return;
          const docRef = doc(db, 'users', user.uid);
          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const profileData = docSnap.data() as Profile;
              setProfile(profileData);
            }
          });
          return () => unsubscribe();
        } catch (error) {
          console.error('Error setting up profile listener:', error);
        }
      },[user])

      const disputeData:DisputeEntry[] = [
        { label: "Name", transunion: String(profile?.firstName ) + profile?.lastName , experian: String(profile?.firstName ) + profile?.lastName, equifax:String(profile?.firstName ) + profile?.lastName },
        { label: "Date Of Birth", transunion: "05/12/1985", experian: "12/31/1984", equifax: "05/12/1985" },
        { label: "Also Known As", transunion: String(profile?.firstName ) + profile?.lastName, experian: String(profile?.firstName ) + profile?.lastName, equifax: String(profile?.firstName ) + profile?.lastName },
        { label: "Former Name", transunion: "Not Reported", experian: "Not Reported", equifax: "Not Reported" },
        { label: "Current Address", transunion: "385 ASHANA DR COLLIERVILLE TN 38017", experian: "1138 N GERMANTOWN PKW # 101-225CORDOVA TN 380165872", equifax: "880 SCHILLING FARM RD APT 201 COLLIERVILLE TN 38017" },
        { label: "Previous Address", transunion: "880 SCHILLING FARM RD COLLIERVILLE TN 38017, 7825 GROVE CT GERMANTOWN TN 38138", experian: "7825 GROVE CT WGermantown TN 381383354, 385 ASHANA DR COLLIERVILLE TN 380171105", equifax: "7825 GROVE CT W APT 102 GERMANTOWN TN 38138, 385 ASHANA DR COLLIERVILLE TN 38017" },
        { label: "Employer", transunion: [{ value: "SELF", updated: "2023-10-25" }, { value: "THE CREDIT SOLUTION GROUP ACAD", updated: "2022-03-03" }], experian: [{ value: "FULL HOUSE ENTERTAINMENT", updated: "2021-05-01" }, { value: "MVSU", updated: "2007-07-01" }], equifax: [{ value: "FULL HOUSE ENTERTAIN", updated: "2024-07-01" }] },
    ];

    const formatDisputes = (selected: Record<string, boolean>) => {
        const grouped: Record<Bureau, FormattedDispute[]> = {
          transunion: [],
          experian: [],
          equifax: []
        };
      
        disputeData.forEach((item, rowIndex) => {
          (['transunion', 'experian', 'equifax'] as Bureau[]).forEach((bureau) => {
            const value = item[bureau];
      
            if (Array.isArray(value)) {
              value.forEach((entry, i) => {
                const key = `${rowIndex}-${bureau}-${i}`;
                if (selected[key]) {
                  grouped[bureau].push({ field: item.label, value: entry.value });
                }
              });
            } else {
              const key = `${rowIndex}-${bureau}`;
              if (selected[key]) {
                grouped[bureau].push({ field: item.label, value });
              }
            }
          });
        });
      
        return grouped;
      };
      

    return (
        <>
            {disputeData.map((item, rowIndex) => (
                <TableRow key={rowIndex} className="border-b">
                    <TableCell className="font-medium pl-6 text-left">{item.label}</TableCell>
                    {(['transunion', 'experian', 'equifax'] as const).map((bureau) => (
                        <TableCell key={bureau} className="text-left">
                            {Array.isArray(item[bureau]) ? (
                                item[bureau].map((entry, index) => {
                                    const key = `${rowIndex}-${bureau}-${index}`;
                                    return (
                                        <div key={key} className="flex flex-col space-y-1">
                                            <div className="flex items-start space-x-2">
                                                <Checkbox
                                                    checked={selectedDisputes[key] || false}
                                                    onCheckedChange={() => toggleDispute(key)}
                                                />
                                                <span>{entry.value}</span>
                                            </div>
                                            {entry.updated && (
                                                <span className="text-xs text-gray-400 ml-6">(Date Updated: {entry.updated})</span>
                                            )}
                                            {selectedDisputes[key] && (
                                                <span
                                                    className="text-green-500 text-sm ml-6 cursor-pointer hover:underline"
                                                    onClick={() => toggleDispute(key)}
                                                >
                                                    Dispute
                                                </span>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-start space-x-2">
                                        <Checkbox
                                            checked={selectedDisputes[`${rowIndex}-${bureau}`] || false}
                                            onCheckedChange={() => toggleDispute(`${rowIndex}-${bureau}`)}
                                        />
                                        <span>{item[bureau]}</span>
                                    </div>
                                    {selectedDisputes[`${rowIndex}-${bureau}`] && (
                                        <span
                                            className="text-green-500 text-sm ml-6 cursor-pointer"
                                            onClick={() => toggleDispute(`${rowIndex}-${bureau}`)}
                                        >
                                            Dispute
                                        </span>
                                    )}
                                </div>
                            )}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}


