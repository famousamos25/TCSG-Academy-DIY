"use client";

import { Card } from '@/components/ui/card';
import { disputeMenus } from '@/constants/disputes';
import { FilmIcon } from 'lucide-react';
import { useState } from 'react';
import { ConsumerLawDisputesDialog } from './consumer-law-disputes-dialog';
import { SecurityFreezeDialog } from './security-freeze-dialog';
import { OtherdisputeDialog } from './other-dispute-dialog';

interface Props { }

const DisputeMenus = ({ }: Props) => {
	const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

	return (
		<Card className="bg-white p-6 text-center">
			<h2 className="text-green-600 text-xl font-semibold mb-4">Create a Dispute</h2>
			<div className="flex justify-center space-x-3">
				<button className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">Start Tour</button>
				<button className="border border-green-500 text-green-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
					<FilmIcon size={16} />
					Tutorial
				</button>
			</div>
			<div className="grid grid-cols-5 gap-4 mt-6">
				{disputeMenus.map((item, index) => (
					<div
						key={index}
						onClick={() => setSelectedMenu(item.type)}
						className="border-2 border-dashed border-gray-300 p-5 rounded-lg text-center flex flex-col items-center space-y-2
              					hover:border-green-400 hover:border-solid hover:bg-opacity-10 cursor-pointer transition-all group"
					>
						<div className="bg-gray-100 p-1 rounded-lg flex items-center justify-center
              						group-hover:bg-green-100 group-hover:text-green-500 transition-all">
							{item.icon}
						</div>
						<span className="text-gray-600 text-sm">{item.title}</span>
					</div>
				))}
			</div>

			{
				selectedMenu === "security-freeze" && (
					<SecurityFreezeDialog
						open={selectedMenu === "security-freeze"}
						onOpenChange={() => setSelectedMenu(null)}
					/>
				)
			}

			{
				selectedMenu === "consumer-law" && (
					<ConsumerLawDisputesDialog
						open={selectedMenu === "consumer-law"}
						onOpenChange={() => setSelectedMenu(null)}
						hideDisputeActions={false}
					/>
				)
			}

			{
				selectedMenu === "metro-2" && (
					<ConsumerLawDisputesDialog
						open={selectedMenu === "metro-2"}
						onOpenChange={() => setSelectedMenu(null)}
						hideDisputeActions={true}
					/>
				)
			}

            {
				selectedMenu === "other" && (
					<OtherdisputeDialog
						open={selectedMenu === "other"}
						onOpenChange={() => setSelectedMenu(null)}
					/>
				)
			}

		</Card>
	);
};

export default DisputeMenus;
