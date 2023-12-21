import { ApiProperty } from '@nestjs/swagger';

import {
  IAuditTrail,
  ICarbonCopies,
  IContractUser,
  IDocument,
  IDocumentDetails,
  IDocumentForSignature,
  IDocumentInvitation,
  IDocumentInvitations,
  IDocumentObject,
  IDocumentResponse,
  IEmbeddedSigning,
  IMetadata,
  IParsedCustomFieldValues,
  IParsedCustomFields,
  IRoles,
  ISignatories,
  ITemplate,
  ITemplateDocumentInvitations,
  ITwalaServerStatus,
} from '@src/interfaces';

export class ParsedCustomFieldsDTO implements IParsedCustomFields {
  @ApiProperty()
  annotation_id: string;

  @ApiProperty()
  annotation_user_uuid: string;

  @ApiProperty()
  placeholder: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  type: 'text';
}

export class ParsedCustomFieldValuesDTO implements IParsedCustomFieldValues {
  @ApiProperty()
  annotation_id: string;

  @ApiProperty()
  value: string;
}

export class ContractUserDTO implements IContractUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  identity_contract_address: null;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: null;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  suffix: null;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobile: null;

  @ApiProperty()
  avatar: null;

  @ApiProperty()
  is_verified: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  is_activated: boolean;

  @ApiProperty()
  is_accepted_terms_and_conditions: boolean;

  @ApiProperty()
  is_accepted_privacy_policy: boolean;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  is_secure_login_enabled: boolean;

  @ApiProperty()
  is_secure_signing_enabled: boolean;

  @ApiProperty()
  next_forgot_password_at: string;

  @ApiProperty()
  failed_login_attempts: number;

  @ApiProperty()
  next_identification_claim_at: null;

  @ApiProperty()
  must_change_password: boolean;

  @ApiProperty()
  activation_token_expires_at: null;

  @ApiProperty()
  is_beta_features_enabled: boolean;
}

export class SignatoriesDTO implements ISignatories {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: null;

  @ApiProperty()
  document_id: number;

  @ApiProperty()
  annotation_user_uuid: string;

  @ApiProperty()
  signature: null;

  @ApiProperty()
  is_signed: boolean;

  @ApiProperty()
  is_finished: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  metadata: null;

  @ApiProperty()
  signatory_type_id: number;

  @ApiProperty()
  address: null;

  @ApiProperty()
  is_notarial_act_type_accepted: null;

  @ApiProperty()
  signing_reason: null;

  @ApiProperty()
  via_api: boolean;

  @ApiProperty()
  secret: string;

  @ApiProperty()
  is_payee: boolean;

  @ApiProperty()
  is_payment_pulled: boolean;

  @ApiProperty()
  user: null;
}

export class DocumentInvitationsDTO implements IDocumentInvitations {
  @ApiProperty()
  id: number;

  @ApiProperty()
  document_id: number;

  @ApiProperty()
  annotation_user_uuid: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  is_sent: boolean;

  @ApiProperty()
  is_accepted: boolean;

  @ApiProperty()
  is_declined: boolean;

  @ApiProperty()
  created_at: string | Date;

  @ApiProperty()
  updated_at: string | Date;

  @ApiProperty()
  signatory_type_id: number;

  @ApiProperty()
  address: null;

  @ApiProperty()
  reason: null;

  @ApiProperty()
  order: number;

  @ApiProperty()
  current_signer_in_order: boolean;
}

export class CarbonCopiesDTO implements ICarbonCopies {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;
}

export class DocumentDetailsDTO implements IDocumentDetails {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  document_status_id: number;

  @ApiProperty()
  document_category_id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: 'iBL Contract Template';

  @ApiProperty()
  size: number;

  @ApiProperty()
  temporary_path: string;

  @ApiProperty()
  audit_trail: string;

  @ApiProperty()
  is_recorded: boolean;

  @ApiProperty()
  created_at: string | Date;

  @ApiProperty()
  updated_at: string | Date;

  @ApiProperty()
  is_recording: boolean;

  @ApiProperty()
  is_public: boolean;

  @ApiProperty()
  verified_users_only: boolean;

  @ApiProperty()
  google_meet_room_id: null;

  @ApiProperty()
  preparation_address: null;

  @ApiProperty()
  business_team_id: number;

  @ApiProperty()
  template_id: number;

  @ApiProperty()
  cfr_compliance: boolean;

  @ApiProperty()
  via_api: boolean;

  @ApiProperty()
  custom_fields: string | ParsedCustomFieldsDTO[];

  @ApiProperty()
  custom_field_values: string | ParsedCustomFieldValuesDTO[];

  @ApiProperty()
  test: boolean;

  @ApiProperty()
  no_account_required: boolean;

  @ApiProperty()
  has_password: boolean;

  @ApiProperty()
  ordered_signing: boolean;

  @ApiProperty()
  batch: null;

  @ApiProperty()
  batch_order: number;

  @ApiProperty()
  batch_name: null;

  @ApiProperty()
  is_smart_document: boolean;

  @ApiProperty()
  smart_contract_address: null;

  @ApiProperty()
  is_embedded_signing: boolean;

  @ApiProperty()
  application_id: number;

  @ApiProperty()
  user: ContractUserDTO;

  @ApiProperty()
  signatories: SignatoriesDTO[];

  @ApiProperty()
  documentInvitations: DocumentInvitationsDTO[];

  @ApiProperty()
  carbonCopies: ICarbonCopies[];
}

export class DocumentDTO implements IDocument {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  document_id: number;

  @ApiProperty()
  document_path: string;

  @ApiProperty()
  is_archived: boolean;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  created_at: string | Date;

  @ApiProperty()
  updated_at: string | Date;

  @ApiProperty()
  for_deletion: boolean;

  @ApiProperty()
  for_deletion_at: null;

  @ApiProperty()
  business_team_id: number;

  @ApiProperty()
  is_confirmed: boolean;

  @ApiProperty()
  document: DocumentDetailsDTO;
}

export class DocumentObjectDTO implements IDocumentObject {
  @ApiProperty()
  total: string;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  data: DocumentDTO[];

  @ApiProperty()
  asset_id: string;
}

export class RolesDTO implements IRoles {
  @ApiProperty()
  role_name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  role_uuid: string;
}

export class AuditTrailDTO implements IAuditTrail {
  @ApiProperty()
  email: boolean;

  @ApiProperty()
  uuid: boolean;

  @ApiProperty()
  author: boolean;

  @ApiProperty()
  mobile: boolean;

  @ApiProperty()
  id: boolean;

  @ApiProperty()
  is_enabled: boolean;
}

export class TemplateDocumentInvitationsDTO
  implements ITemplateDocumentInvitations
{
  @ApiProperty()
  roles: RolesDTO[];
}

export class MetadataDTO implements IMetadata {
  @ApiProperty()
  carbon_copies: CarbonCopiesDTO[];

  @ApiProperty()
  document_invitations: TemplateDocumentInvitationsDTO;

  @ApiProperty()
  audit_trail: IAuditTrail;

  @ApiProperty()
  no_account_required: boolean;

  @ApiProperty()
  ordered_signing: boolean;

  @ApiProperty()
  ordered_roles: string[];

  @ApiProperty()
  message: string;
}

export class TemplateDTO implements ITemplate {
  @ApiProperty()
  size: number;

  @ApiProperty()
  metadata: MetadataDTO;

  @ApiProperty()
  custom_fields: string;

  @ApiProperty()
  custom_field_values: string;

  @ApiProperty()
  batch: any | null;

  @ApiProperty()
  batch_name: any | null;

  @ApiProperty()
  batch_order: any | null;

  @ApiProperty()
  template_uuid: string;

  @ApiProperty()
  template_name: string;
}

export class TwalaServerStatusDTO implements ITwalaServerStatus {
  @ApiProperty()
  name: string;

  @ApiProperty()
  version: string;

  @ApiProperty()
  status: string;
}

export class DocumentInvitationDTO implements IDocumentInvitation {
  @ApiProperty()
  role_uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  full_name: string;
}

export class EmbeddedSigningDTO implements IEmbeddedSigning {
  @ApiProperty()
  email: string;

  @ApiProperty()
  url: string;
}

export class DocumentForSignatureDTO implements IDocumentForSignature {
  @ApiProperty()
  document_name?: string;

  @ApiProperty()
  template_uuid: string;

  @ApiProperty()
  document_invitations: DocumentInvitationDTO[];

  @ApiProperty()
  audit_trail: AuditTrailDTO;

  @ApiProperty()
  carbon_copies?: CarbonCopiesDTO[];

  @ApiProperty()
  message?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  custom_field_values: ParsedCustomFieldValuesDTO[];

  @ApiProperty()
  test?: boolean;

  @ApiProperty()
  embedded_signing?: EmbeddedSigningDTO[];
}

export class DocumentResponseDTO implements IDocumentResponse {
  @ApiProperty()
  data: DocumentForSignatureDTO;

  @ApiProperty()
  document_uuid: string;

  @ApiProperty()
  is_sent: boolean;
}

export class DocumentFilterDTO {
  @ApiProperty({
    isArray: true,
    type: String,
  })
  uuid: string[];
}
